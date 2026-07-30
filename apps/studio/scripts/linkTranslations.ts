// apps/studio/scripts/linkTranslations.ts
import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const GROUPS = [
  {base: 'impressum', type: 'legalPage'},
  {base: 'datenschutz', type: 'legalPage'},
]

const LANGS = ['de', 'en', 'es']

async function run() {
  for (const {base, type} of GROUPS) {
    const ids = LANGS.map((l) => `${base}-${l}`)
    const existing = await client.fetch<{_id: string}[]>(`*[_id in $ids]{_id}`, {ids})

    if (!existing.length) {
      console.log(`übersprungen: ${base} (keine Dokumente)`)
      continue
    }

    await client.createOrReplace({
      _id: `${base}-translations`,
      _type: 'translation.metadata',
      schemaTypes: [type],
      translations: existing.map((doc) => ({
        _key: doc._id.split('-').pop(),
        _type: 'internationalizedArrayReferenceValue',
        language: doc._id.split('-').pop(),
        value: {_type: 'reference', _ref: doc._id},
      })),
    })

    console.log(`verknüpft: ${base} (${existing.length} Sprachen)`)
  }
}

run()
