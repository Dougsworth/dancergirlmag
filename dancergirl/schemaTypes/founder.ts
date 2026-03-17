import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'founder',
  title: 'Founder',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'internationalizedString',
      validation: (Rule) => Rule.required(),
      initialValue: {
        en: 'Shanice Neita',
        es: 'Shanice Neita'
      }
    }),
    defineField({
      name: 'title',
      title: 'Title/Position',
      type: 'internationalizedString',
      initialValue: {
        en: 'Founder & Editor-in-Chief',
        es: 'Fundadora y Editora en Jefe'
      }
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'internationalizedBlockContent',
      description: 'Tell the story of the founder - background, vision, achievements, etc.'
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Professional photo of the founder'
    }),
    defineField({
      name: 'quote',
      title: 'Inspirational Quote',
      type: 'internationalizedText',
      description: 'A meaningful quote from the founder about dance, culture, or the magazine'
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'achievement',
              title: 'Achievement',
              type: 'internationalizedString',
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'internationalizedText',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Website', value: 'website' },
                  { title: 'Email', value: 'email' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education & Background',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'institution',
              title: 'Institution/Company',
              type: 'internationalizedString',
            },
            {
              name: 'degree',
              title: 'Degree/Position',
              type: 'internationalizedString',
            },
            {
              name: 'year',
              title: 'Year',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'internationalizedText',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'internationalizedBlockContent',
      description: 'The founder\'s vision for DancerGirl and Caribbean dance culture'
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'email',
      description: 'Public contact email for the founder'
    }),
    defineField({
      name: 'isActive',
      title: 'Show Founder Section',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide the founder section on the About page'
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'title.en',
      media: 'image',
    },
  },
});