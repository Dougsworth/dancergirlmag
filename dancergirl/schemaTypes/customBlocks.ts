import { defineType, defineField } from 'sanity';

export const codeBlock = defineType({
  name: 'code',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash', value: 'bash' },
          { title: 'Markdown', value: 'markdown' },
        ],
      },
    }),
    defineField({
      name: 'filename',
      title: 'Filename (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'language',
      subtitle: 'code',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Code Block (${title || 'no language specified'})`,
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No code',
      };
    },
  },
});

export const youtubeEmbed = defineType({
  name: 'youtube',
  title: 'YouTube Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste the URL of the YouTube video',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption for the video',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare(selection) {
      const { url, caption } = selection;
      return {
        title: 'YouTube Video',
        subtitle: caption || url || 'No URL provided',
      };
    },
  },
});

export default [codeBlock, youtubeEmbed];
