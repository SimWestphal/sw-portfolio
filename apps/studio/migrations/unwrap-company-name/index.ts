import {at, defineMigration, set, unset} from 'sanity/migrate'

const LANGUAGE = 'de'

export default defineMigration({
  title: 'Unwrap company.name from internationalizedArrayString to string',
  documentTypes: ['company'],

  migrate: {
    document(doc) {
      const name = doc.name

      // schon ein String (oder leer)? -> nichts tun (idempotent)
      if (!Array.isArray(name)) return

      // de-Wert nehmen, sonst den ersten vorhandenen
      const entry = name.find((item) => item?.language === LANGUAGE) ?? name[0]

      // leeres Array -> Feld entfernen
      if (!entry?.value) return at('name', unset())

      return at('name', set(entry.value))
    },
  },
})
