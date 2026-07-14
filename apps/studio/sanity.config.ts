import {visionTool} from '@sanity/vision'
import {defineConfig, type Template} from 'sanity'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Simone Westphal Portfolio',

  projectId: 'wfwca0w2',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
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

  templates: (prev: Template[]) => [
    ...prev,
    {
      id: 'legalPage-byLang',
      title: 'Rechtstext (Sprache)',
      schemaType: 'legalPage',
      parameters: [{name: 'language', type: 'string'}],
      value: ({language}: {language: string}) => ({language}),
    },
  ],
})
