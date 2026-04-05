import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: '🎬 Hero Video & Caption',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Label (Internal Only)',
      type: 'string',
      description: 'A name to help you identify this hero setting (e.g., "April 2026 Hero").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video 🎥',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload the background video for the hero section. MP4 format recommended. If left empty, the dancer\'s featured image will be used instead.',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Or Paste a Video URL',
      type: 'url',
      description: 'Alternatively, paste a direct link to the video file (e.g., from a CDN). This is used if no file is uploaded above.',
    }),
    defineField({
      name: 'captionHeading',
      title: 'Caption Heading ✨',
      type: 'string',
      description: 'The small label above the dancer\'s name (e.g., "Dancer of the Month").',
      initialValue: 'Dancer of the Month',
    }),
    defineField({
      name: 'captionName',
      title: 'Caption Name (Dancer\'s Name) 💃',
      type: 'string',
      description: 'The dancer\'s name displayed on the hero section.',
      validation: (Rule) => Rule.required().error('Enter the dancer\'s name for the hero caption'),
    }),
    defineField({
      name: 'captionButtonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button (e.g., "Meet Keisha").',
    }),
    defineField({
      name: 'captionLink',
      title: 'Caption Link (Where clicking the name goes) 🔗',
      type: 'reference',
      to: [{ type: 'dancerOfTheMonth' }, { type: 'article' }],
      description: 'Choose which Dancer of the Month feature or article this links to. When visitors click the dancer\'s name, they\'ll go to this page.',
    }),
    defineField({
      name: 'captionLinkUrl',
      title: 'Or Custom Link URL',
      type: 'string',
      description: 'Alternatively, type a custom URL path (e.g., "/dancers-of-the-month/keisha-april-2026"). Used if no reference is selected above.',
    }),
    defineField({
      name: 'isActive',
      title: 'Make This the Active Hero? 🌟',
      type: 'boolean',
      description: 'Turn this ON to use this hero section on the homepage. Only one should be active at a time!',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      captionName: 'captionName',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, captionName, isActive } = selection
      return {
        title: title || 'Untitled Hero',
        subtitle: `${isActive ? '🟢 Active' : '⚪ Inactive'} — ${captionName || 'No dancer set'}`,
      }
    },
  },
})
