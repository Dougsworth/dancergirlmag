import { defineType } from 'sanity';
import { TranslateStringInput } from '../components/TranslateInput';

export default defineType({
  name: 'internationalizedString',
  title: 'Internationalized String',
  type: 'object',
  components: {
    input: TranslateStringInput,
  },
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
    {
      name: 'es',
      title: 'Spanish',
      type: 'string',
    },
  ],
});