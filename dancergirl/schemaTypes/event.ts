import { defineField, defineType } from 'sanity'
import { CalendarDays } from 'lucide-react'

export default defineType({
  name: 'event',
  title: '📅 Events & Workshops',
  type: 'document',
  icon: CalendarDays,
  fieldsets: [
    {
      name: 'basics',
      title: '📝 Event Basics',
      options: { collapsible: false }
    },
    {
      name: 'datetime',
      title: '⏰ When & Where',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'registration',
      title: '🎫 Registration & Tickets',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'details',
      title: '🖼️ Photos & Details',
      options: { collapsible: true, collapsed: true }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Event Name 🎭',
      type: 'string',
      fieldset: 'basics',
      validation: (Rule) => Rule.required().min(5).max(100).error('Please enter an event name (5-100 characters)'),
      description: 'Give your event a catchy, descriptive name that will attract attendees.',
    }),
    defineField({
      name: 'slug',
      title: 'Website Link (Auto-Generated) 🔗',
      type: 'slug',
      fieldset: 'basics',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Click "Generate" to create the website link'),
      description: 'This creates the web address for your event page. Click "Generate" after entering the event name.',
    }),
    defineField({
      name: 'description',
      title: 'Event Details 📝',
      type: 'array',
      fieldset: 'basics',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required().error('Please describe your event'),
      description: 'Describe your event in detail - what will happen, who should attend, what to expect, etc. Make it exciting!',
    }),
    defineField({
      name: 'startDateTime',
      title: 'When Does It Start? 🕒',
      type: 'datetime',
      fieldset: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (Rule) => Rule.required().error('Please set when the event starts'),
      description: 'Choose the exact date and time your event begins.',
    }),
    defineField({
      name: 'endDateTime',
      title: 'When Does It End? (Optional) 🕛',
      type: 'datetime',
      fieldset: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      description: 'Set when the event ends. Leave blank if it\'s open-ended or you\'re not sure yet.',
    }),
    defineField({
      name: 'isRecurring',
      title: 'Does This Repeat? 🔁',
      type: 'boolean',
      fieldset: 'datetime',
      initialValue: false,
      description: 'Turn this ON if this event happens regularly (like weekly dance classes).',
    }),
    defineField({
      name: 'recurrencePattern',
      title: 'How Often? 📅',
      type: 'string',
      fieldset: 'datetime',
      options: {
        list: [
          { title: 'Every Day', value: 'daily' },
          { title: 'Every Week', value: 'weekly' },
          { title: 'Every Two Weeks', value: 'biweekly' },
          { title: 'Every Month', value: 'monthly' },
        ],
      },
      hidden: ({ parent }) => !parent?.isRecurring,
      description: 'How often does this event repeat?',
    }),
    defineField({
      name: 'location',
      title: 'Where Is It Happening? 📍',
      type: 'object',
      fieldset: 'datetime',
      fields: [
        {
          name: 'isOnline',
          title: 'Is this an online event? 💻',
          type: 'boolean',
          initialValue: false,
          description: 'Turn this ON for virtual events (Zoom, Instagram Live, etc.)',
        },
        {
          name: 'meetingUrl',
          title: 'Online Meeting Link',
          type: 'url',
          hidden: ({ parent }) => !parent?.isOnline,
          description: 'Paste the Zoom link, Instagram Live URL, or other online meeting link',
        },
        {
          name: 'name',
          title: 'Venue Name',
          type: 'string',
          hidden: ({ parent }) => parent?.isOnline,
          description: 'Name of the venue, studio, or location',
        },
        {
          name: 'address',
          title: 'Full Address',
          type: 'text',
          rows: 2,
          hidden: ({ parent }) => parent?.isOnline,
          description: 'Complete address where people should go',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          hidden: ({ parent }) => parent?.isOnline,
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          hidden: ({ parent }) => parent?.isOnline,
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Event Photo 📸',
      type: 'image',
      fieldset: 'details',
      options: {
        hotspot: true,
      },
      description: 'Upload a great photo that represents your event. This could be from a previous event, the venue, or a promotional image.',
    }),
    defineField({
      name: 'organizer',
      title: 'Who\'s Organizing? 📋',
      type: 'string',
      fieldset: 'details',
      description: 'Enter the name of who is organizing this event.',
    }),
    defineField({
      name: 'price',
      title: 'How Much Does It Cost? 💵',
      type: 'number',
      fieldset: 'registration',
      description: 'Enter the ticket price in dollars. Use 0 for completely free events.',
      initialValue: 0,
    }),
    defineField({
      name: 'registrationRequired',
      title: 'Do People Need to Sign Up? 📝',
      type: 'boolean',
      fieldset: 'registration',
      initialValue: false,
      description: 'Turn this ON if people need to register or buy tickets in advance.',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Where to Register/Buy Tickets',
      type: 'url',
      fieldset: 'registration',
      hidden: ({ parent }) => !parent?.registrationRequired,
      description: 'Paste the link where people can register or buy tickets (Eventbrite, website, etc.)',
    }),
    defineField({
      name: 'maxAttendees',
      title: 'How Many People Can Attend? (Optional)',
      type: 'number',
      fieldset: 'registration',
      hidden: ({ parent }) => !parent?.registrationRequired,
      description: 'Set a limit if the venue has limited space. Leave blank for unlimited.',
    }),
    defineField({
      name: 'tags',
      title: 'Event Tags 🏷️',
      type: 'array',
      fieldset: 'details',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add keywords that describe your event (e.g., "beginner-friendly", "carnival", "workshop"). This helps people find your event.',
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'startDateTime', direction: 'desc' }],
    },
    {
      title: 'Date, Oldest First',
      name: 'dateAsc',
      by: [{ field: 'startDateTime', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      startDateTime: 'startDateTime',
      location: 'location.name',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, startDateTime, location } = selection
      const date = startDateTime ? new Date(startDateTime) : 'No date set'
      const formattedDate = date instanceof Date 
        ? date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : date
      
      return {
        ...selection,
        title: title || 'Untitled Event',
        subtitle: [formattedDate, location].filter(Boolean).join(' • '),
      }
    },
  },
})
