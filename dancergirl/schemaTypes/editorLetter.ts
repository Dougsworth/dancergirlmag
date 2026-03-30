import { defineField, defineType } from 'sanity';
import { MessageSquare } from 'lucide-react';

export default defineType({
  name: 'editorLetter',
  title: '✍️ Personal Letters from the Editor',
  type: 'document',
  icon: MessageSquare,
  fieldsets: [
    {
      name: 'basics',
      title: '📝 Letter Basics',
      options: { collapsible: false }
    },
    {
      name: 'letterContent',
      title: '✍️ Letter Content',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'publishing',
      title: '🚀 Publish & Feature',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'seo',
      title: '🔍 Search & Social Media',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Letter Subject 💬',
      type: 'string',
      fieldset: 'basics',
      validation: (Rule) => Rule.required(),
      description: 'Write a compelling subject line for your letter, like you would for an email to your readers.',
    }),
    defineField({
      name: 'slug',
      title: 'Website Link (Auto-Generated) 🔗',
      type: 'slug',
      fieldset: 'basics',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      description: 'This creates the web address for your letter. Click "Generate" after writing your subject line.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Photo 🖼️',
      type: 'image',
      fieldset: 'basics',
      options: { hotspot: true },
      description: 'The main thumbnail/cover image shown on the homepage and in article listings.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Letter Preview 📝',
      type: 'text',
      rows: 3,
      fieldset: 'basics',
      validation: (Rule) => Rule.required(),
      description: 'Write a short preview of what this letter is about. This helps readers decide if they want to read the full letter.',
    }),
    defineField({
      name: 'content',
      title: 'Write Your Letter ✍️',
      type: 'blockContent',
      fieldset: 'letterContent',
      validation: (Rule) => Rule.required(),
      description: 'Write your personal letter here! Share your thoughts, experiences, and connect with your readers. You can add photos too.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'When to Send? 📅',
      type: 'datetime',
      fieldset: 'publishing',
      validation: (Rule) => Rule.required(),
      description: 'Choose when this letter should go live on the website. You can schedule it for the future!',
    }),
    defineField({
      name: 'featured',
      title: 'Feature This Letter? 🌟',
      type: 'boolean',
      fieldset: 'publishing',
      description: 'Turn this ON to highlight this letter prominently on the website. Great for important announcements or special messages!',
      initialValue: false,
    }),
    defineField({
      name: 'author',
      title: 'Who\'s Writing? ✍️',
      type: 'reference',
      fieldset: 'basics',
      to: [{ type: 'founder' }],
      validation: (Rule) => Rule.required(),
      description: 'Choose who is writing this personal letter (usually the founder/editor).',
    }),
    defineField({
      name: 'tags',
      title: 'Letter Topics 🏷️',
      type: 'array',
      fieldset: 'publishing',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add topics or themes this letter covers. This helps readers find letters about specific subjects.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Google Search Title (Optional) 🔍',
      type: 'string',
      fieldset: 'seo',
      description: 'Want a different title to appear in Google search results? Enter it here. Otherwise, we\'ll use your letter subject.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Google Search Description (Optional) 💬',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      description: 'This appears under your letter title in Google search results. Make it engaging to get more clicks! If blank, we\'ll use your letter preview.',
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, publishedAt, featured } = selection;
      const status = featured ? '⭐ Featured' : '✉️ Letter';
      return {
        title: title || 'Untitled Letter',
        subtitle: `${status} • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'}`,
      };
    },
  },
});
