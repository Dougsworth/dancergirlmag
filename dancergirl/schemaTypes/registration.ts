import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'registration',
  title: 'Tutorial Registration',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'experienceLevel',
      title: 'Dance Experience Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'preferredStyle',
      title: 'Preferred Dance Style',
      type: 'string',
      options: {
        list: [
          'Hip Hop',
          'Jazz',
          'Contemporary',
          'Ballet',
          'Salsa',
          'Other'
        ]
      }
    }),
    defineField({
      name: 'newsletterOptIn',
      title: 'Subscribe to Newsletter',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'submissionDate',
      title: 'Submission Date',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString()
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      level: 'experienceLevel'
    },
    prepare(selection) {
      const { title, subtitle, level } = selection;
      return {
        title: title,
        subtitle: `${subtitle} (${level})`
      };
    }
  }
});
