import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  groups: [
    {
      name: 'profile',
      title: '👤 Profile Info',
      default: true,
    },
    {
      name: 'social',
      title: '🌐 Social Media',
    },
    {
      name: 'seo',
      title: '🔍 SEO & Social',
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      description: "The author's full name as it should appear on articles",
      group: 'profile',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "Auto-generated from name. Used in author page URLs.",
      group: 'profile',
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Photo",
      type: "image",
      description: "Professional headshot or profile picture",
      group: 'profile',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Job Title/Role",
      type: "string",
      description: "E.g., 'Senior Writer', 'Dance Instructor', 'Editor-in-Chief'",
      group: 'profile',
    }),
    defineField({
      name: "bio",
      title: "Author Biography",
      type: "array",
      of: [{ type: "block" }],
      description: "Tell readers about the author's background and expertise",
      group: 'profile',
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "featured",
      title: "⭐ Featured Author",
      type: "boolean",
      description: "Highlight this author on the team page and in author listings",
      group: 'profile',
      initialValue: false,
    }),
    defineField({
      name: "social",
      title: "Social Media Links",
      type: "object",
      description: "Connect readers with the author's social presence",
      group: 'social',
      fields: [
        defineField({ 
          name: "instagram", 
          type: "url", 
          title: "📷 Instagram",
          placeholder: "https://instagram.com/username"
        }),
        defineField({ 
          name: "twitter", 
          type: "url", 
          title: "🐦 Twitter/X",
          placeholder: "https://twitter.com/username"
        }),
        defineField({ 
          name: "website", 
          type: "url", 
          title: "🌐 Personal Website",
          placeholder: "https://yourwebsite.com"
        }),
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
      description: "Custom title for search engines (leave blank to use author name)",
      group: 'seo',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Custom description for search engines (leave blank to auto-generate from bio)",
      group: 'seo',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social Media Image",
      type: "image",
      description: "Custom image for social sharing (leave blank to use profile photo)",
      group: 'seo',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "role",
    },
  },
});