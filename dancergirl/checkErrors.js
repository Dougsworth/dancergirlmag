// Run this with: sanity exec checkErrors.js --with-user-token
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({apiVersion: '2023-01-01'})

async function checkAllErrors() {
  console.log('🔍 Scanning all documents for validation errors...\n')
  
  // Get all document types and their counts
  const typeCounts = await client.fetch(`*[!(_id in path("_.*"))] | {
    "_type": _type
  } | group(_type) {
    "type": _type,
    "count": count()
  }`)
  
  console.log('📊 Document counts by type:')
  typeCounts.forEach(type => {
    console.log(`  ${type.type}: ${type.count} documents`)
  })
  console.log('')
  
  // Check each document type for common validation issues
  const issues = []
  
  // 1. Check for string titles that should be internationalized
  console.log('🔍 Checking for string titles that should be internationalized...')
  const stringTitles = await client.fetch(`*[
    _type in ["article", "category", "editorLetter"] && 
    defined(title) && 
    !(title._type == "internationalizedString")
  ] {
    _id,
    _type,
    title,
    "titleType": typeof(title)
  }`)
  
  if (stringTitles.length > 0) {
    console.log(`❌ Found ${stringTitles.length} documents with string titles (should be internationalized):`)
    stringTitles.forEach(doc => {
      console.log(`  - ${doc._type}: "${doc.title}" (${doc._id})`)
      issues.push({
        type: 'String title needs internationalization',
        document: doc._id,
        docType: doc._type,
        field: 'title',
        value: doc.title
      })
    })
    console.log('')
  }
  
  // 2. Check for string descriptions/excerpts that should be internationalized
  console.log('🔍 Checking for string descriptions/excerpts that should be internationalized...')
  const stringDescriptions = await client.fetch(`*[
    (_type == "category" && defined(description) && !(description._type == "internationalizedText")) ||
    (_type == "article" && defined(excerpt) && !(excerpt._type == "internationalizedText"))
  ] {
    _id,
    _type,
    description,
    excerpt,
    "descType": typeof(description),
    "excerptType": typeof(excerpt)
  }`)
  
  if (stringDescriptions.length > 0) {
    console.log(`❌ Found ${stringDescriptions.length} documents with string descriptions/excerpts:`)
    stringDescriptions.forEach(doc => {
      if (doc.description && doc.descType === 'string') {
        console.log(`  - ${doc._type}: description "${doc.description.substring(0, 50)}..." (${doc._id})`)
        issues.push({
          type: 'String description needs internationalization',
          document: doc._id,
          docType: doc._type,
          field: 'description'
        })
      }
      if (doc.excerpt && doc.excerptType === 'string') {
        console.log(`  - ${doc._type}: excerpt "${doc.excerpt.substring(0, 50)}..." (${doc._id})`)
        issues.push({
          type: 'String excerpt needs internationalization',
          document: doc._id,
          docType: doc._type,
          field: 'excerpt'
        })
      }
    })
    console.log('')
  }
  
  // 3. Check for missing required fields
  console.log('🔍 Checking for missing required fields...')
  
  // Articles missing required fields
  const articlesWithMissingFields = await client.fetch(`*[_type == "article"] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author,
    categories,
    body,
    "missingFields": [
      !defined(title) => "title",
      !defined(slug) => "slug", 
      !defined(excerpt) => "excerpt",
      !defined(mainImage) => "mainImage",
      !defined(publishedAt) => "publishedAt",
      !defined(author) => "author",
      !defined(categories) => "categories",
      !defined(body) => "body"
    ][defined(@)]
  }[count(missingFields) > 0]`)
  
  if (articlesWithMissingFields.length > 0) {
    console.log(`❌ Found ${articlesWithMissingFields.length} articles with missing required fields:`)
    articlesWithMissingFields.forEach(doc => {
      console.log(`  - Article ${doc._id}: missing ${doc.missingFields.join(', ')}`)
      doc.missingFields.forEach(field => {
        issues.push({
          type: 'Missing required field',
          document: doc._id,
          docType: 'article',
          field: field
        })
      })
    })
    console.log('')
  }
  
  // Categories missing required fields
  const categoriesWithMissingFields = await client.fetch(`*[_type == "category"] {
    _id,
    title,
    slug,
    description,
    "missingFields": [
      !defined(title) => "title",
      !defined(slug) => "slug",
      !defined(description) => "description"
    ][defined(@)]
  }[count(missingFields) > 0]`)
  
  if (categoriesWithMissingFields.length > 0) {
    console.log(`❌ Found ${categoriesWithMissingFields.length} categories with missing required fields:`)
    categoriesWithMissingFields.forEach(doc => {
      console.log(`  - Category ${doc._id}: missing ${doc.missingFields.join(', ')}`)
      doc.missingFields.forEach(field => {
        issues.push({
          type: 'Missing required field',
          document: doc._id,
          docType: 'category',
          field: field
        })
      })
    })
    console.log('')
  }
  
  // 4. Check for broken references
  console.log('🔍 Checking for broken references...')
  const brokenRefs = await client.fetch(`*[_type == "article"] {
    _id,
    "brokenAuthor": defined(author) && !defined(author->_id),
    "brokenCategories": categories[defined(@) && !defined(@->_id)],
    "brokenRelated": relatedArticles[defined(@) && !defined(@->_id)]
  }[
    brokenAuthor == true ||
    count(brokenCategories) > 0 ||
    count(brokenRelated) > 0
  ]`)
  
  if (brokenRefs.length > 0) {
    console.log(`❌ Found ${brokenRefs.length} documents with broken references:`)
    brokenRefs.forEach(doc => {
      if (doc.brokenAuthor) {
        console.log(`  - Article ${doc._id}: broken author reference`)
        issues.push({
          type: 'Broken reference',
          document: doc._id,
          docType: 'article',
          field: 'author'
        })
      }
      if (doc.brokenCategories?.length > 0) {
        console.log(`  - Article ${doc._id}: ${doc.brokenCategories.length} broken category references`)
        issues.push({
          type: 'Broken reference',
          document: doc._id,
          docType: 'article',
          field: 'categories'
        })
      }
      if (doc.brokenRelated?.length > 0) {
        console.log(`  - Article ${doc._id}: ${doc.brokenRelated.length} broken related article references`)
        issues.push({
          type: 'Broken reference',
          document: doc._id,
          docType: 'article',
          field: 'relatedArticles'
        })
      }
    })
    console.log('')
  }
  
  // 5. Check for duplicate slugs
  console.log('🔍 Checking for duplicate slugs...')
  const duplicateSlugs = await client.fetch(`*[defined(slug.current)] {
    "slug": slug.current,
    "_id": _id,
    "_type": _type
  } | group(slug) {
    "slug": slug,
    "documents": @[],
    "count": count(@)
  }[count > 1]`)
  
  if (duplicateSlugs.length > 0) {
    console.log(`❌ Found ${duplicateSlugs.length} duplicate slugs:`)
    duplicateSlugs.forEach(group => {
      console.log(`  - Slug "${group.slug}" used by:`)
      group.documents.forEach(doc => {
        console.log(`    - ${doc._type}: ${doc._id}`)
        issues.push({
          type: 'Duplicate slug',
          document: doc._id,
          docType: doc._type,
          field: 'slug',
          value: group.slug
        })
      })
    })
    console.log('')
  }
  
  // 6. Check for invalid field structures
  console.log('🔍 Checking for invalid field structures...')
  
  // Check for articles with invalid body structure
  const invalidBodies = await client.fetch(`*[_type == "article" && defined(body)] {
    _id,
    "bodyType": typeof(body),
    "hasEn": defined(body.en),
    "hasEs": defined(body.es),
    "isArray": body._type == "internationalizedBlockContent",
    body
  }[bodyType == "string" || (bodyType == "object" && !isArray)]`)
  
  if (invalidBodies.length > 0) {
    console.log(`❌ Found ${invalidBodies.length} articles with invalid body structure:`)
    invalidBodies.forEach(doc => {
      console.log(`  - Article ${doc._id}: body is ${doc.bodyType}, should be internationalizedBlockContent`)
      issues.push({
        type: 'Invalid body structure',
        document: doc._id,
        docType: 'article',
        field: 'body'
      })
    })
    console.log('')
  }
  
  // Summary
  console.log('📋 SUMMARY')
  console.log('=' * 50)
  
  if (issues.length === 0) {
    console.log('✅ No validation errors found! Your Sanity setup looks good.')
  } else {
    console.log(`❌ Found ${issues.length} total issues:`)
    
    const issuesByType = issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1
      return acc
    }, {})
    
    Object.entries(issuesByType).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count}`)
    })
    
    console.log('\n📝 Recommended fixes:')
    console.log('1. For internationalization issues, use the migration guides in /migrations/')
    console.log('2. For missing fields, edit each document and fill in required information')
    console.log('3. For broken references, check that referenced documents still exist')
    console.log('4. For duplicate slugs, regenerate slugs for affected documents')
    console.log('5. For invalid structures, reset the field values and re-enter data')
  }
  
  console.log('\n🔧 Migration scripts available:')
  console.log('- node migrations/migrateCategoryFields.js')
  console.log('- node migrations/migrateArticleFields.js')
  
  return issues
}

checkAllErrors()