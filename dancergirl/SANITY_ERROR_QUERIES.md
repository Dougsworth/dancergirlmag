# Sanity Error Detection Queries

Use these GROQ queries in Sanity Studio's Vision tool to find validation errors:

## 1. Find String Titles (Should be Internationalized)

```groq
*[
  _type in ["article", "category", "editorLetter"] && 
  defined(title) && 
  !(title._type == "internationalizedString")
] {
  _id,
  _type,
  title,
  "titleType": typeof(title),
  "link": "https://dancergirl.sanity.studio/intent/edit/id=" + _id
}
```

## 2. Find String Descriptions/Excerpts (Should be Internationalized)

```groq
*[
  (_type == "category" && defined(description) && !(description._type == "internationalizedText")) ||
  (_type == "article" && defined(excerpt) && !(excerpt._type == "internationalizedText"))
] {
  _id,
  _type,
  description,
  excerpt,
  "descType": typeof(description),
  "excerptType": typeof(excerpt),
  "link": "https://dancergirl.sanity.studio/intent/edit/id=" + _id
}
```

## 3. Find Missing Required Fields

### Articles with missing required fields:
```groq
*[_type == "article"] {
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
  ][defined(@)],
  "link": "https://dancergirl.sanity.studio/intent/edit/id=" + _id
}[count(missingFields) > 0]
```

### Categories with missing required fields:
```groq
*[_type == "category"] {
  _id,
  title,
  slug,
  description,
  "missingFields": [
    !defined(title) => "title",
    !defined(slug) => "slug",
    !defined(description) => "description"
  ][defined(@)],
  "link": "https://dancergirl.sanity.studio/intent/edit/id=" + _id
}[count(missingFields) > 0]
```

## 4. Find Broken References

```groq
*[_type == "article"] {
  _id,
 
  
  count(brokenRelated) > 0
]
```

## 5. Find Duplicate Slugs

```groq
*[defined(slug.current)] {
  "slug": slug.current,
  "_id": _id,
  "_type": _type
} | group(slug) {
  "slug": slug,
  "documents": @[],
  "count": count(@)
}[count > 1]
```

## 6. Find Invalid Body Structures

```groq
*[_type == "article" && defined(body)] {
  _id,
  "bodyType": typeof(body),
  "hasEn": defined(body.en),
  "hasEs": defined(body.es),
  "isValidStructure": body._type == "internationalizedBlockContent",
  "link": "https://dancergirl.sanity.studio/intent/edit/id=" + _id
}[bodyType == "string" || (bodyType == "object" && !isValidStructure)]
```

## How to Use These Queries

1. Open Sanity Studio
2. Go to the Vision tool (usually in the bottom left menu)
3. Copy and paste each query one by one
4. Click "Execute" to run the query
5. Review the results to see which documents have issues
6. Use the "link" field to directly navigate to problematic documents

## Quick Fixes

- **String titles/descriptions**: Click "Reset value" then re-enter the text
- **Missing fields**: Fill in the required information
- **Broken references**: Remove invalid references or create the missing referenced documents
- **Duplicate slugs**: Click "Generate" to create new unique slugs
- **Invalid structures**: Reset the field and re-enter the content