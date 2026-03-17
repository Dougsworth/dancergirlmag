// dancergirl/schemaTypes/playlist.ts
import { defineField, defineType } from 'sanity';
import type { StringRule, SlugRule, UrlRule, TextRule } from 'sanity';

export default defineType({
  name: 'playlist',
  title: 'Playlist',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: StringRule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: SlugRule) => rule.required()
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Spotify', value: 'spotify' },
          { title: 'Apple Music', value: 'apple' },
          { title: 'YouTube', value: 'youtube' }
        ],
        layout: 'radio'
      },
      validation: (rule: StringRule) => rule.required()
    }),
    defineField({
      name: 'playlistUrl',
      title: 'Playlist URL',
      type: 'url',
      description: 'The public URL of the playlist',
      validation: (rule: UrlRule) => rule.required().uri({
        scheme: ['http', 'https'],
        allowRelative: false,
        allowCredentials: false
      })
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
    },
    prepare(selection) {
      const { title, platform } = selection;
      return {
        title,
        subtitle: `Platform: ${platform}`
      };
    }
  }
});