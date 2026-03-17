import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'DancerGirl Island Rhythms',

  projectId: 'f37vktt0',
  dataset: 'production',

  cors: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173',
      'https://dancergirl.vercel.app',
      'https://dancergirl-island-rhythms.vercel.app',
      /^https:\/\/dancergirl.*\.vercel\.app$/
    ]
  },

  plugins: [
    structureTool({
      structure,
      name: 'content-manager',
      title: 'Content Manager',
    }),
    visionTool({
      name: 'groq-playground',
      title: 'GROQ Playground',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
