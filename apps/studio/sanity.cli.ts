import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wfwca0w2',
    dataset: 'production'
  },
  typegen: {
    // Schema liegt hier im Studio, die Queries in apps/web:
    path: '../web/src/**/*.{ts,tsx}', // wo defineQuery-Aufrufe gesucht werden
    schema: 'schema.json', // Zwischenprodukt von `sanity schema extract`
    generates: '../web/sanity.types.ts', // Ausgabe ins Web-Paket
    overloadClientMethods: true, // typisiert client.fetch / sanityFetch automatisch
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
