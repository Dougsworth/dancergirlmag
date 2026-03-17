import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  groups: [
    {
      name: 'general',
      title: '🏷️ General Info',
      default: true,
    },
    {
      name: 'appearance',
      title: '🎨 Appearance',
    },
    {
      name: 'seo',
      title: '🔍 SEO & Social',
    },
    {
      name: 'relationships',
      title: '🔗 Relationships',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'internationalizedString',
      description: 'The display name for this category',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from category name. Used in URLs.',
      group: 'general',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'internationalizedText',
      description: 'What type of content belongs in this category?',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Category Icon',
      type: 'string',
      description: 'Icon name from your icon library to represent this category',
      group: 'appearance',
      initialValue: 'tag',
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      description: 'Color theme for this category in the UI',
      group: 'appearance',
      options: {
        list: [
          {title: '🔴 Red', value: 'red'},
          {title: '🔵 Blue', value: 'blue'},
          {title: '🟢 Green', value: 'green'},
          {title: '🟣 Purple', value: 'purple'},
          {title: '🩷 Pink', value: 'pink'},
          {title: '🟡 Yellow', value: 'yellow'},
        ],
      },
      initialValue: 'purple',
    }),
    defineField({
      name: 'featured',
      title: '⭐ Featured Category',
      type: 'boolean',
      description: 'Display prominently in featured sections and navigation',
      group: 'appearance',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Category Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Visual representation of this category (optional)',
      group: 'appearance',
    }),
    defineField({
      name: 'relatedCategories',
      title: 'Related Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      description: 'Similar or complementary categories to suggest to users',
      group: 'relationships',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom title for search engines (leave blank to use category name)',
      group: 'seo',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Custom description for search engines (leave blank to auto-generate)',
      group: 'seo',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'description.en',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Untitled Category',
        subtitle: subtitle || '',
        media: media || TagIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Title, Z-A',
      name: 'titleDesc',
      by: [{field: 'title', direction: 'desc'}],
    },
  ],
})