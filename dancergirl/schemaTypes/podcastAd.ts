import { defineField, defineType } from 'sanity'
import { Headphones } from 'lucide-react'

export default defineType({
  name: 'podcastAd',
  title: 'Podcast Ad',
  type: 'document',
  icon: Headphones,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedString',
      validation: (Rule) => Rule.required(),
      description: 'The title of your podcast'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedText',
      validation: (Rule) => Rule.required(),
      description: 'Brief description of your podcast'
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        }
      ],
      description: 'Podcast cover art or promotional image'
    }),
    defineField({
      name: 'platforms',
      title: 'Platforms',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Platform Name',
              type: 'string',
              options: {
                list: [
                  { title: 'Spotify', value: 'spotify' },
                  { title: 'Apple Podcasts', value: 'apple' },
                  { title: 'Google Podcasts', value: 'google' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Goodpods', value: 'goodpods' },
                  { title: 'Amazon Music', value: 'amazon' },
                  { title: 'Other', value: 'other' }
                ]
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'url',
              title: 'Platform URL',
              type: 'url',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'displayName',
              title: 'Display Name',
              type: 'string',
              description: 'How the platform name should appear (e.g., "Listen on Spotify")'
            }
          ],
          preview: {
            select: {
              title: 'displayName',
              subtitle: 'url'
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Add links to your podcast on different platforms'
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'internationalizedString',
      initialValue: {
        en: 'Listen Now',
        es: 'Escuchar Ahora'
      },
      description: 'Button text for the main call to action'
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'internationalizedString',
      description: 'Short catchy phrase (e.g., "Our Podcast")'
    }),
    defineField({
      name: 'displayLocation',
      title: 'Display Location',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          { title: 'Home Page', value: 'home' },
          { title: 'Stories Page', value: 'stories' },
          { title: 'Events Page', value: 'events' },
          { title: 'Sidebar', value: 'sidebar' },
          { title: 'Footer', value: 'footer' }
        ]
      },
      validation: (Rule) => Rule.required().min(1),
      description: 'Where should this podcast ad appear?'
    }),
    defineField({
      name: 'style',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Card', value: 'card' },
          { title: 'Banner', value: 'banner' },
          { title: 'Inline', value: 'inline' },
          { title: 'Hero', value: 'hero' }
        ],
        layout: 'radio'
      },
      initialValue: 'card',
      description: 'How the podcast ad should be displayed'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code for background (e.g., #FF6B6B)',
      validation: (Rule) => Rule.regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
        name: 'hex color',
        invert: false
      }).error('Must be a valid hex color code')
    }),
    defineField({
      name: 'featuredEpisode',
      title: 'Featured Episode',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Episode Title',
          type: 'string'
        },
        {
          name: 'number',
          title: 'Episode Number',
          type: 'number'
        },
        {
          name: 'description',
          title: 'Episode Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'url',
          title: 'Episode URL',
          type: 'url'
        }
      ],
      description: 'Optionally highlight a specific episode'
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this podcast ad'
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      initialValue: 0,
      description: 'Higher priority ads will be shown first (when multiple ads target the same location)'
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When should this ad start showing? (optional)'
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When should this ad stop showing? (optional)'
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'description.en',
      media: 'coverImage',
      active: 'isActive'
    },
    prepare(selection) {
      const { title, subtitle, media, active } = selection
      return {
        title: title || 'Untitled Podcast Ad',
        subtitle: `${active ? '🟢 Active' : '🔴 Inactive'} - ${subtitle || 'No description'}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Priority',
      name: 'priorityDesc',
      by: [
        {field: 'priority', direction: 'desc'}
      ]
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [
        {field: 'title.en', direction: 'asc'}
      ]
    }
  ]
})