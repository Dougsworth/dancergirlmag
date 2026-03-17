import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ad',
  title: 'Advertisement',
  type: 'document',
  icon: () => '📢',
  fields: [
    defineField({
      name: 'title',
      title: 'Ad Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Internal name for this advertisement'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Turn this off to disable the ad'
    }),
    defineField({
      name: 'adType',
      title: 'Ad Type',
      type: 'string',
      options: {
        list: [
          { title: 'Banner (728x90)', value: 'banner' },
          { title: 'Square (300x250)', value: 'square' },
          { title: 'Sidebar (300x250)', value: 'sidebar' },
          { title: 'Skyscraper (160x600)', value: 'skyscraper' },
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'banner'
    }),
    defineField({
      name: 'placement',
      title: 'Placement Location',
      type: 'string',
      options: {
        list: [
          { title: 'Home Page - Between Sections', value: 'home-between' },
          { title: 'Articles - Top of Page', value: 'article-top' },
          { title: 'Articles - Middle of Content', value: 'article-middle' },
          { title: 'Articles - End of Content', value: 'article-end' },
          { title: 'Watch Page - Between Videos', value: 'watch-between' },
          { title: 'Stories Page - Between Stories', value: 'stories-between' },
          { title: 'Global - Sidebar Left', value: 'global-sidebar-left' },
          { title: 'Global - Sidebar Right', value: 'global-sidebar-right' },
        ]
      },
      validation: Rule => Rule.required(),
      description: 'Where should this ad appear on the website?'
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.required().min(1).max(10),
      description: 'Higher numbers have higher priority (1-10)'
    }),
    defineField({
      name: 'adContent',
      title: 'Ad Content',
      type: 'object',
      fields: [
        defineField({
          name: 'contentType',
          title: 'Content Type',
          type: 'string',
          options: {
            list: [
              { title: 'HTML/JavaScript Code', value: 'html' },
              { title: 'Image with Link', value: 'image' },
              { title: 'Third-party Script', value: 'script' }
            ]
          },
          initialValue: 'image'
        }),
        defineField({
          name: 'htmlCode',
          title: 'HTML/JavaScript Code',
          type: 'text',
          hidden: ({ parent }) => parent?.contentType !== 'html',
          description: 'Paste your ad network code here (Google AdSense, etc.)'
        }),
        defineField({
          name: 'image',
          title: 'Ad Image',
          type: 'image',
          hidden: ({ parent }) => parent?.contentType !== 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }
          ]
        }),
        defineField({
          name: 'linkUrl',
          title: 'Click URL',
          type: 'url',
          hidden: ({ parent }) => parent?.contentType !== 'image',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel']
          }),
          description: 'Where should users go when they click the ad?'
        }),
        defineField({
          name: 'scriptSrc',
          title: 'Script Source URL',
          type: 'url',
          hidden: ({ parent }) => parent?.contentType !== 'script',
          description: 'URL to external script file'
        })
      ]
    }),
    defineField({
      name: 'targeting',
      title: 'Targeting Rules',
      type: 'object',
      fields: [
        defineField({
          name: 'pages',
          title: 'Show on Pages',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Home', value: 'home' },
              { title: 'Watch', value: 'watch' },
              { title: 'Stories', value: 'stories' },
              { title: 'About', value: 'about' },
              { title: 'Events', value: 'events' },
              { title: 'Dancers', value: 'dancers' },
              { title: 'Music', value: 'music' },
              { title: 'All Pages', value: 'all' }
            ]
          },
          description: 'Leave empty to show on all pages'
        }),
        defineField({
          name: 'excludePages',
          title: 'Exclude from Pages',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Home', value: 'home' },
              { title: 'Watch', value: 'watch' },
              { title: 'Stories', value: 'stories' },
              { title: 'About', value: 'about' },
              { title: 'Events', value: 'events' },
              { title: 'Dancers', value: 'dancers' },
              { title: 'Music', value: 'music' }
            ]
          }
        })
      ]
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'object',
      fields: [
        defineField({
          name: 'startDate',
          title: 'Start Date',
          type: 'datetime',
          description: 'When should this ad start showing?'
        }),
        defineField({
          name: 'endDate',
          title: 'End Date', 
          type: 'datetime',
          description: 'When should this ad stop showing?'
        })
      ]
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackingId',
          title: 'Tracking ID',
          type: 'string',
          description: 'Optional tracking identifier for analytics'
        }),
        defineField({
          name: 'notes',
          title: 'Internal Notes',
          type: 'text',
          description: 'Internal notes about this ad campaign'
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      adType: 'adType',
      placement: 'placement',
      isActive: 'isActive',
      media: 'adContent.image'
    },
    prepare(selection) {
      const { title, adType, placement, isActive, media } = selection
      return {
        title: title,
        subtitle: `${adType} • ${placement} ${isActive ? '✅' : '❌'}`,
        media: media || '📢'
      }
    }
  }
})