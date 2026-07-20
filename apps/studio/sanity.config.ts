import {documentInternationalization} from '@sanity/document-internationalization'
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
    documentInternationalization({
      supportedLanguages: (client) =>
        client.fetch(`*[_type == "locale"] | order(default desc){ "id": tag, "title": name }`),
      schemaTypes: ['navigation', 'siteSettings'],
    }),
  ],

  schema: {
    types: schemaTypes,

    templates: (prev: Template[]) => [
      ...prev,
      {
        id: 'legalPage-by-language',
        title: 'Rechtstext (Sprache)',
        schemaType: 'legalPage',
        parameters: [{name: 'language', type: 'string'}],
        value: ({language}: {language: string}) => ({language}),
      },
      {
        id: 'navigation-by-language',
        title: 'navigation',
        schemaType: 'navigation',
        parameters: [{name: 'language', type: 'string'}],
        value: (params: {language: string}) => ({
          language: params.language,
        }),
      },
      {
        id: 'siteSettings-by-language',
        title: 'siteSettings',
        schemaType: 'siteSettings',
        parameters: [{name: 'language', type: 'string'}],
        value: (params: {language: string}) => ({
          language: params.language,
        }),
      },
    ],
  },
})
