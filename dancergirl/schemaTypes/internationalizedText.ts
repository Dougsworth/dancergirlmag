import { defineType } from 'sanity';
import { TranslateTextInput } from '../components/TranslateTextInput';

export default defineType({
  name: 'internationalizedText',
  title: 'Internationalized Text',
  type: 'object',
  components: {
    input: TranslateTextInput,
  },
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      validation: (Rule) => Rule.max(300),
    },
    {
      name: 'es',
      title: 'Spanish',
      type: 'text',
      validation: (Rule) => Rule.max(300),
    },
  ],
});