# Article Migration Guide

## Quick Fix (Recommended)

For each article showing the "Invalid property value" error:

1. **Click "Reset value"** button for the Title field
2. The field will be cleared
3. Enter the article title again in the new internationalized format
4. Save the document

## Manual GROQ Update (Alternative)

You can also update articles using GROQ in Vision tool:

### 1. First, check which articles need updating:
```groq
*[_type == "article" && defined(title) && !(title._type == "internationalizedString")]
{
  _id,
  title,
  excerpt
}
```

### 2. For each article, run this mutation in Vision:
```groq
// Replace DOCUMENT_ID and VALUES with actual data
*[_id == "DOCUMENT_ID"][0] {
  "patches": [
    {
      "set": {
        "title": {
          "_type": "internationalizedString",
          "en": "Your Article Title",
          "es": "Tu Título del Artículo"
        }
      }
    }
  ]
}
```

## Using the Migration Script

If you have many articles to update:

1. Set up a Sanity API token:
   ```bash
   # In your terminal
   cd dancergirl
   npx sanity manage
   # Go to API tab and create a token with write access
   ```

2. Set the token as environment variable:
   ```bash
   export SANITY_API_TOKEN="your-token-here"
   ```

3. Run the migration:
   ```bash
   node migrations/migrateArticleFields.js
   ```

## Prevention

To avoid this in the future, always use the internationalized field types when creating new schemas that might need translation.