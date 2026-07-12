import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Simone Westphal Portfolio',

  projectId: 'wfwca0w2',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    internationalizedArray({
      languages: (client) =>
        client.fetch(`*[_type == "locale"]|order(default desc){ "id": tag, "title": name }`),
      fieldTypes: ['string', 'text'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
