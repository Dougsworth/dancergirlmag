# Translation Feature for Sanity Studio

This feature adds automatic English to Spanish translation for internationalized fields in Sanity Studio.

## How it Works

The translation feature uses **free translation APIs** that don't require API keys:

1. **MyMemory Translation API** (Primary)
   - Free up to 5,000 characters per day
   - No API key required
   - Good quality translations
   - Powered by Google and Microsoft translations

2. **LibreTranslate** (Fallback)
   - Open source and free
   - Community-hosted instances available
   - No API key required

3. **Local Translation** (Final Fallback)
   - Basic word/phrase replacement
   - Works offline
   - Limited but functional

## Usage

### For String Fields
When editing internationalized string fields, you'll see:
- An English input field
- A "Translate to Spanish" button
- A Spanish input field

Simply:
1. Enter your English text
2. Click "Translate to Spanish"
3. Review and edit the translation as needed

### For Text Areas
Same as string fields but for longer text content.

### For Rich Text (Block Content)
The translate button appears at the top of the editor:
1. Write your content in English
2. Click "Translate to Spanish"
3. The Spanish tab will be populated with translated content
4. Review and edit as needed

## Limitations

- Free tier limits: 5,000 characters per day with MyMemory
- Translations are automatic and may need manual review
- Complex formatting in rich text is preserved but should be checked
- Technical or specialized terms may not translate perfectly

## Customization

To add more languages or customize translations:
1. Edit `/dancergirl/lib/translate.ts`
2. Add language codes to the translation functions
3. Update the internationalized field schemas to include new languages

## Troubleshooting

If translations aren't working:
1. Check your internet connection
2. Check the browser console for errors
3. The system will automatically fallback to local translation if APIs are unavailable

## Privacy Note

The free translation APIs process text on their servers. Don't translate sensitive or private information.