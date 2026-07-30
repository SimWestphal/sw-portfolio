// apps/studio/scripts/createSingletons.ts
import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const LANGS = ['de', 'en', 'es']

async function createSingleton(base: string, type: string, titles: Record<string, string>) {
  const tx = client.transaction()

  // 1. Die Sprachdokumente
  for (const lang of LANGS) {
    tx.createIfNotExists({
      _id: `${base}-${lang}`,
      _type: type,
      language: lang, // ← direkt mitsetzen, nicht nachträglich patchen
      title: titles[lang],
    })
  }

  // 2. Das Verbindungsdokument — der Teil, der gefehlt hat
  tx.createIfNotExists({
    _id: `${base}-translations`,
    _type: 'translation.metadata',
    schemaTypes: [type],
    translations: LANGS.map((lang) => ({
      _key: lang,
      _type: 'internationalizedArrayReferenceValue',
      language: lang,
      value: {_type: 'reference', _ref: `${base}-${lang}`},
    })),
  })

  await tx.commit()
}

async function run() {
  await createSingleton('impressum', 'legalPage', {
    de: 'Impressum',
    en: 'Imprint',
    es: 'Aviso legal',
  })
  await createSingleton('datenschutz', 'legalPage', {
    de: 'Datenschutz',
    en: 'Privacy',
    es: 'Privacidad',
  })
}

run()
