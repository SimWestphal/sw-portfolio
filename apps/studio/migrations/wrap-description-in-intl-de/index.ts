import {at, defineMigration, set} from 'sanity/migrate'

const LANGUAGE = 'de'

export default defineMigration({
  title: 'Wrap project.description into internationalizedArrayPortableText (de)',
  documentTypes: ['project'],

  migrate: {
    document(doc) {
      const description = doc.description

      // nichts zu tun, wenn leer
      if (!Array.isArray(description) || description.length === 0) return

      // schon migriert? -> überspringen (macht die Migration idempotent)
      const alreadyMigrated = description.every(
        (item) => item?._type === 'internationalizedArrayPortableTextValue',
      )
      if (alreadyMigrated) return

      // altes Block-Array in die de-Hülle packen
      return at(
        'description',
        set([
          {
            _key: LANGUAGE,
            _type: 'internationalizedArrayPortableTextValue',
            language: LANGUAGE,
            value: description,
          },
        ]),
      )
    },
  },
})
