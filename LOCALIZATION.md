# Sanity Mehrsprachigkeit — vollständiger Leitfaden (DE / EN / FR)

> Planungs- und Umsetzungsdokument für die Mehrsprachigkeit des Portfolios.
> Beispiele: **DE = Default**, dazu **EN** und **FR** (FR = Platzhalter, austauschbar).
> Stand: Studio noch leer → idealer Zeitpunkt, das von Anfang an sauber aufzusetzen.
>
> **Verifiziert (2026-07-12) gegen:** `sanity@6` (Studio v6), React 19,
> `@sanity/document-internationalization@6`, `sanity-plugin-internationalized-array@5`.

Inhalt:
0. [Muss ich schon beim Schema etwas beachten?](#0-muss-ich-schon-beim-schema-etwas-beachten--ja)
1. [Die Grundsatzentscheidung: Document- vs. Field-Level](#1-die-grundsatzentscheidung)
2. [Locale als Content-Type](#2-locale-als-content-type)
3. [Document-Level einrichten](#3-document-level-localization-einrichten)
4. [Field-Level einrichten](#4-field-level-localization-einrichten)
5. [Lokalisierte Singletons (Homepage)](#5-lokalisierte-singletons-homepage-pro-sprache)
6. [Studio-Structure](#6-studio-structure)
7. [GROQ-Queries mit Fallback](#7-groq-queries-mit-fallback)
8. [Next.js Frontend & Routing](#8-nextjs-frontend--routing)
9. [Sprachumschalter](#9-sprachumschalter-language-switcher)
10. [SEO: hreflang, Sitemap](#10-seo-hreflang--sitemap)
11. [KI-Übersetzung & UI-Helfer](#11-ki-übersetzung--ui-helfer-optional)
12. [Stolperfallen](#12-stolperfallen)
13. [Umsetzungs-Reihenfolge (TL;DR)](#13-umsetzungs-reihenfolge-tldr)

---

## 0. Muss ich schon beim Schema etwas beachten? → JA

Die wichtigste Weiche stellst du **bevor** das erste Schema steht. Der Grund:
Der Lokalisierungs-Ansatz bestimmt die **Struktur** deiner Dokumente. Ihn später
zu wechseln bedeutet, bestehenden Content zu migrieren.

Konkret musst du jetzt entscheiden:

- **Pro Dokumenttyp:** Document-Level oder Field-Level? (Abschnitt 1)
- Braucht der Typ ein verstecktes `language`-Feld? (nur Document-Level)
- Wie sehen **Slugs pro Sprache** aus? (`/de/projekt-x` vs. `/en/project-x`)
- Welche Felder sind **nicht** übersetzbar (Bild, Datum) — und stört deren Duplikation?

Alles Weitere (Plugins, Routing, SEO) kann man nachrüsten. Die Schema-Struktur nicht
ohne Migration. Deshalb steht sie hier ganz vorne.

---

## 1. Die Grundsatzentscheidung

Zwei Ansätze — dürfen im selben Projekt gemischt werden:

| | **Document-Level** | **Field-Level** |
|---|---|---|
| **Prinzip** | Ein Dokument **pro Sprache** | Ein Dokument, jedes Feld hält **alle Sprachen** |
| **IDs** | `projekt-x-de`, `projekt-x-en` (verknüpft via `translation.metadata`) | eine ID, ein Dokument |
| **Publizieren** | pro Sprache unabhängig | alles zusammen |
| **Passt für** | Seiten, Projekte, Blogposts ("Presentation") | Skills, Kategorien, Tags ("strukturierte Dinge") |
| **Plugin** | `@sanity/document-internationalization` | `sanity-plugin-internationalized-array` |

### So sieht der Unterschied im Datenmodell aus

**Document-Level** — drei Dokumente:
```json
{ "_id": "abc", "_type": "project", "language": "de", "title": "Mein Projekt" }
{ "_id": "def", "_type": "project", "language": "en", "title": "My Project" }
{ "_id": "ghi", "_type": "project", "language": "fr", "title": "Mon projet" }
```

**Field-Level** — ein Dokument (Plugin `internationalized-array`):
```json
{
  "_id": "abc",
  "_type": "skill",
  "title": [
    { "_key": "a1b2c3", "language": "de", "value": "Barrierefreiheit" },
    { "_key": "d4e5f6", "language": "en", "value": "Accessibility" },
    { "_key": "g7h8i9", "language": "fr", "value": "Accessibilité" }
  ]
}
```
> **Wichtig (ab internationalized-array v5):** Die Sprache steht im Feld
> `language`, **nicht** mehr im `_key`. `_key` ist nur noch ein zufälliger,
> stabiler Array-Schlüssel. Ältere Beispiele mit `_key == "de"` sind veraltet.

### Entscheidungshilfe
1. Sollen Sprachversionen **unabhängig** live gehen? → Document-Level
2. Struktur überall gleich, nur Text unterscheidet sich? → Field-Level
3. Felder sprachübergreifend geteilt (ein Bild, ein Datum)? → Field-Level
4. Reordering/Änderungen sollen **global** gelten? → Field-Level

**Empfehlung fürs Portfolio:**
- `page`, `project`, `post`, `homePage` → **Document-Level**
- `skill`, `category` (kleine geteilte Listen) → **Field-Level**

---

## 2. Locale als Content-Type

Sprachen **in Sanity** speichern (nicht nur im Code) — dann teilen Studio und
Frontend dieselbe Quelle, und du kannst Fallbacks pflegen.

```typescript
// schemaTypes/locale.ts
import {TranslateIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const localeType = defineType({
  name: 'locale',
  title: 'Sprache',
  icon: TranslateIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tag',
      title: 'IETF-Tag',
      type: 'string',
      description: 'z. B. de, en, fr (RFC 5646)',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'fallback',
      title: 'Fallback-Sprache',
      type: 'reference',
      to: [{type: 'locale'}],
      description: 'Worauf zurückfallen, wenn eine Übersetzung fehlt',
    }),
    defineField({
      name: 'default',
      title: 'Standardsprache',
      type: 'boolean',
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'tag'}},
})
```

Danach im Studio **drei Locale-Dokumente** anlegen:

| name | tag | default | fallback |
|---|---|---|---|
| Deutsch | `de` | true | — |
| English | `en` | false | Deutsch |
| Français | `fr` | false | Deutsch |

```typescript
// schemaTypes/index.ts
import {localeType} from './locale'
import {projectType} from './project'
import {skillType} from './skill'
import {homePageType} from './homePage'

export const schemaTypes = [localeType, projectType, skillType, homePageType]
```

---

## 3. Document-Level Localization einrichten

### 3.1 Plugin installieren
```bash
pnpm add @sanity/document-internationalization
```

### 3.2 `language`-Feld in jedes lokalisierte Schema

```typescript
// schemaTypes/project.ts
import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
  fields: [
    // Von document-internationalization verwaltet — versteckt & readonly:
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // Slug pro Sprache aus dem Titel generieren:
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Titelbild',
      type: 'image',
      options: {hotspot: true},
      // Achtung: wird pro Sprache dupliziert (siehe Stolperfallen)
    }),
    defineField({
      name: 'body',
      title: 'Beschreibung',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {title: 'title', language: 'language', media: 'coverImage'},
    prepare({title, language, media}) {
      return {title, subtitle: language?.toUpperCase(), media}
    },
  },
})
```

### 3.3 Plugin konfigurieren

```typescript
// sanity.config.ts
import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const LOCALIZED_TYPES = ['project', 'page', 'post']

export default defineConfig({
  name: 'default',
  title: 'Simone Westphal Portfolio',
  projectId: 'wfwca0w2',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    documentInternationalization({
      // Sprachen aus dem locale-Type laden:
      supportedLanguages: (client) =>
        client.fetch(`*[_type == "locale"]|order(default desc){ "id": tag, "title": name }`),
      schemaTypes: LOCALIZED_TYPES,
    }),
  ],

  schema: {types: schemaTypes},

  // Im "Neues Dokument"-Menü nur die Basissprache (de) anbieten;
  // Übersetzungen erzeugt das Plugin aus dem Basisdokument heraus.
  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) =>
          !LOCALIZED_TYPES.includes(item.templateId) ||
          item.parameters?.language === 'de',
      ),
  },

  // Initial Value Templates pro Sprache (nötig fürs Menü):
  templates: (prev) => {
    const localized: Template[] = LOCALIZED_TYPES.flatMap((type) =>
      ['de', 'en', 'fr'].map((lang) => ({
        id: `${type}-${lang}`,
        title: `${type} (${lang.toUpperCase()})`,
        schemaType: type,
        parameters: [{name: 'language', type: 'string'}],
        value: {language: lang},
      })),
    )
    return [...prev, ...localized]
  },
})
```

**Wie das im Studio aussieht:** Du legst ein Projekt auf Deutsch an. Im Dokument
erscheint ein "Translations"-Panel — dort erzeugst du per Klick die EN- und
FR-Version. Sanity legt automatisch ein `translation.metadata`-Dokument an, das
die drei verbindet.

---

## 4. Field-Level Localization einrichten

Für **strukturierte, geteilte** Inhalte (Skills, Kategorien). **Nicht**
selbstgebaute `{de, en, fr}`-Objekte verwenden — die stoßen an Attribut-Limits.

### 4.1 Plugin installieren
```bash
pnpm add sanity-plugin-internationalized-array
```

### 4.2 Konfigurieren

```typescript
// sanity.config.ts (Auszug, zu plugins[] hinzufügen)
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

internationalizedArray({
  languages: (client) =>
    client.fetch(`*[_type == "locale"]|order(default desc){ "id": tag, "title": name }`),
  fieldTypes: ['string', 'text'],
}),
```

Das Plugin erzeugt automatisch neue Typen: `internationalizedArrayString`,
`internationalizedArrayText` usw.

### 4.3 Im Schema verwenden

```typescript
// schemaTypes/skill.ts
import {defineField, defineType} from 'sanity'

export const skillType = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Bezeichnung',
      type: 'internationalizedArrayString', // hält de/en/fr in einem Feld
    }),
    defineField({
      name: 'level',
      title: 'Level (1–5)',
      type: 'number', // NICHT lokalisiert — für alle Sprachen gleich
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image', // geteilt über alle Sprachen
    }),
  ],
})
```

### 4.4 Rich Text auf Field-Level

Braucht einen eigenen Block-Type, der dann in `fieldTypes` registriert wird:

```typescript
// schemaTypes/simpleBlockContent.ts
import {defineType} from 'sanity'

export const simpleBlockContent = defineType({
  name: 'simpleBlockContent',
  type: 'array',
  of: [{type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: []}],
})

// sanity.config.ts:  fieldTypes: ['string', 'text', 'simpleBlockContent']
// im Schema:         type: 'internationalizedArraySimpleBlockContent'
```

### 4.5 Alternative: eigene „localized-Objekte" (wie im Sanity-Demo-Repo)

Es gibt einen **dritten** Weg, den Sanity im offiziellen
[demo-course-platform](https://github.com/sanity-io/demo-course-platform)
zeigt: ein selbstgebautes `object` mit **einem Unterfeld pro Sprache**, generiert
aus der Sprachliste.

```typescript
// schemaTypes/objects/localizedString.ts
import {defineField, defineType} from 'sanity'

const LANGUAGES = [
  {id: 'de', title: 'Deutsch', isDefault: true},
  {id: 'en', title: 'English'},
  {id: 'fr', title: 'Français'},
]

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  // Nicht-Default-Sprachen in ein einklappbares Fieldset:
  fieldsets: [{name: 'translations', title: 'Übersetzungen', options: {collapsible: true}}],
  fields: LANGUAGES.map((lang) =>
    defineField({
      name: lang.id, // -> Feldname = Sprach-ID
      title: lang.title,
      type: 'string',
      fieldset: lang.isDefault ? undefined : 'translations',
    }),
  ),
})

// Verwendung im Schema:
defineField({name: 'title', type: 'localizedString'})
```

Datenform ist dann ein **Objekt mit benannten Keys** (kein Array):
```json
{ "title": { "de": "Barrierefreiheit", "en": "Accessibility", "fr": "Accessibilité" } }
```

**Wann sinnvoll — und wann nicht:**

| | Eigenes `localizedString`-Objekt | `internationalized-array` (Abschnitt 4.1–4.4) |
|---|---|---|
| Plugin nötig | nein | ja |
| GROQ | sehr sauber: `title.de` | `title[language==$locale][0].value` |
| Sprache hinzufügen | **Schema-Änderung** nötig | nur Config, kein Schema-Change |
| Viele Sprachen × Felder | ⚠️ Attribut-Limit (jede Sprache = eigenes Attribut) | ✅ skaliert |
| Editor-UX | simpel, statisch | Plugin-UI + language-filter |

**Empfehlung:** Für dieses Portfolio (kleine, feste Sprachliste) ist das
`localizedString`-Objekt völlig legitim und GROQ-freundlich. Für etwas, das auf
viele Sprachen/Felder wachsen soll, empfiehlt Sanity heute die
`internationalized-array` — deshalb ist die hier der Standard-Weg, das Objekt die
dokumentierte Alternative. (Das Demo-Repo mischt sogar alle drei Ansätze je Typ.)

---

## 5. Lokalisierte Singletons (Homepage pro Sprache)

Für Einzelseiten wie Homepage/Über-mich: Document-Level **plus** feste IDs pro Sprache.

```typescript
// schemaTypes/homePage.ts
import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Startseite',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'intro', title: 'Intro', type: 'text'}),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {title: 'Startseite', subtitle: language?.toUpperCase() ?? 'Keine Sprache'}
    },
  },
})
```

Templates pro Sprache (in `templates` von `sanity.config.ts` ergänzen):

```typescript
const LOCALES = [
  {id: 'de', title: 'Deutsch'},
  {id: 'en', title: 'English'},
  {id: 'fr', title: 'Français'},
]

const homePageTemplates: Template[] = LOCALES.map((locale) => ({
  id: `homePage-${locale.id}`,
  title: `Startseite (${locale.title})`,
  schemaType: 'homePage',
  parameters: [{name: 'language', type: 'string'}],
  value: {language: locale.id},
}))
```

Feste IDs: `homePage-de`, `homePage-en`, `homePage-fr` (nur für Singletons!
Normale Dokumente lassen ihre ID von Sanity generieren).

---

## 6. Studio-Structure

Lokalisierte Singletons gruppieren, damit die Navigation übersichtlich bleibt.

```typescript
// structure/index.ts
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {HomeIcon} from '@sanity/icons'
import type {ComponentType} from 'react'

const LOCALES = ['de', 'en', 'fr']

function localizedSingleton(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items(
          LOCALES.map((locale) =>
            S.listItem()
              .title(`${title} (${locale.toUpperCase()})`)
              .icon(icon)
              .child(
                S.document()
                  .schemaType(typeName)
                  .documentId(`${typeName}-${locale}`) // feste ID pro Sprache
                  .title(`${title} (${locale.toUpperCase()})`),
              ),
          ),
        ),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalt')
    .items([
      localizedSingleton(S, 'homePage', 'Startseite', HomeIcon),
      S.divider(),
      // Singletons + locale aus der normalen Liste herausfiltern:
      ...S.documentTypeListItems().filter(
        (item) => !['homePage', 'locale'].includes(item.getId() as string),
      ),
    ])
```

---

## 7. GROQ-Queries mit Fallback

### Document-Level

```groq
// Ein Projekt in gewünschter Sprache per Slug:
*[_type == "project" && language == $locale && slug.current == $slug][0]{
  title, body, coverImage
}

// Alle Projekte einer Sprache (für Übersichtsseite):
*[_type == "project" && language == $locale]|order(_createdAt desc){
  title, "slug": slug.current, coverImage
}

// Alle Übersetzungen eines Dokuments (für den Sprachumschalter):
*[_type == "translation.metadata" && references($id)][0]{
  translations[]{
    _key,
    "language": value->language,
    "slug": value->slug.current
  }
}
```

### Field-Level A — `internationalized-array` (mit Fallback)

Sprache steht im Feld `language` (nicht im `_key`, siehe Abschnitt 1):

```groq
*[_type == "skill"]{
  // gewünschte Sprache, sonst Deutsch:
  "title": coalesce(
    title[language == $locale][0].value,
    title[language == "de"][0].value
  ),
  level,
  icon
}
```

### Field-Level B — eigenes `localizedString`-Objekt (mit Fallback)

Hier ist das Feld ein Objekt mit benannten Keys → Zugriff per Property. GROQ
erlaubt dynamischen Property-Zugriff mit `[$param]`:

```groq
*[_type == "skill"]{
  // $locale z. B. "en"; fällt auf DE zurück, wenn leer:
  "title": coalesce(title[$locale], title.de),
  level,
  icon
}
```

> Direkt gegenübergestellt für dieselbe Sprache:
> - Objekt:  `title[$locale]`  → knapp, weil benannte Keys
> - Array:   `title[language == $locale][0].value`  → Filter + Index nötig

### Fallback bei Document-Level

Fehlt eine Übersetzung, gibt es kein Dokument in dieser Sprache. Zwei Optionen:
1. Query nach `$locale`, bei leerem Ergebnis zweite Query auf Default-Sprache.
2. `coalesce` über zwei Fetches im Frontend.

```groq
// z. B. Startseite mit Fallback auf DE:
coalesce(
  *[_type == "homePage" && language == $locale][0],
  *[_type == "homePage" && language == "de"][0]
){ headline, intro }
```

---

## 8. Next.js Frontend & Routing

### 8.1 Grundregel
**Locale immer in der URL** — gut für SEO und eindeutig:
```
/de/projekte/projekt-x
/en/projects/project-x
/fr/projets/projet-x
```
Default-Locale **nicht** ohne Prefix am Root lassen (SEO-Edge-Cases).

### 8.2 Ordnerstruktur (App Router)

```
app/
  [locale]/
    layout.tsx          → <html lang={locale}>
    page.tsx            → Homepage
    projekte/
      page.tsx          → Projektübersicht
      [slug]/
        page.tsx        → Einzelprojekt
```

### 8.3 Middleware: Redirect auf Default-Locale

```typescript
// middleware.ts
import {NextRequest, NextResponse} from 'next/server'

const LOCALES = ['de', 'en', 'fr']
const DEFAULT_LOCALE = 'de'

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl

  // Hat der Pfad schon ein Locale-Prefix?
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )
  if (hasLocale) return NextResponse.next()

  // Sonst: auf Default-Locale umleiten
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // statische Assets & API ausnehmen:
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
```

### 8.4 Seite: Daten pro Locale laden

```typescript
// app/[locale]/projekte/[slug]/page.tsx
import {client} from '@/sanity/client'
import {notFound} from 'next/navigation'

const PROJECT_QUERY = `*[_type == "project" && language == $locale && slug.current == $slug][0]{
  title, body, coverImage
}`

export default async function ProjectPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>
}) {
  const {locale, slug} = await params
  const project = await client.fetch(PROJECT_QUERY, {locale, slug})
  if (!project) notFound()

  return <article>{/* ... */}</article>
}
```

### 8.5 `<html lang>` korrekt setzen

```typescript
// app/[locale]/layout.tsx
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
```

---

## 9. Sprachumschalter (Language-Switcher)

Wichtig: **nicht** nur das Prefix austauschen — die Slugs unterscheiden sich pro
Sprache. Übersetzte URLs aus `translation.metadata` holen.

```typescript
// components/LanguageSwitcher.tsx
import Link from 'next/link'
import {client} from '@/sanity/client'

const TRANSLATIONS_QUERY = `*[_type == "translation.metadata" && references($id)][0]{
  translations[]{ "language": value->language, "slug": value->slug.current }
}`

export async function LanguageSwitcher({docId}: {docId: string}) {
  const data = await client.fetch(TRANSLATIONS_QUERY, {id: docId})
  const translations: {language: string; slug: string}[] = data?.translations ?? []

  return (
    <nav aria-label="Sprache wechseln">
      {translations.map((t) => (
        <Link key={t.language} href={`/${t.language}/projekte/${t.slug}`}>
          {t.language.toUpperCase()}
        </Link>
      ))}
    </nav>
  )
}
```

---

## 10. SEO: hreflang & Sitemap

### 10.1 hreflang im `<head>` (App Router Metadata)

```typescript
// in generateMetadata der jeweiligen Seite
export async function generateMetadata({params}) {
  const {locale, slug} = await params
  const {translations} = await client.fetch(TRANSLATIONS_QUERY, {/* ...docId */})

  const languages = Object.fromEntries(
    translations.map((t) => [t.language, `/${t.language}/projekte/${t.slug}`]),
  )

  return {
    alternates: {
      canonical: `/${locale}/projekte/${slug}`,
      languages, // Next.js rendert daraus die hreflang-Tags
    },
  }
}
```

### 10.2 Sitemap mit allen Sprach-URLs

```typescript
// app/sitemap.ts
import {client} from '@/sanity/client'
import type {MetadataRoute} from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await client.fetch(
    `*[_type == "project"]{ "slug": slug.current, language, _updatedAt }`,
  )
  const base = 'https://simone-westphal.com'

  return projects.map((p) => ({
    url: `${base}/${p.language}/projekte/${p.slug}`,
    lastModified: p._updatedAt,
  }))
}
```

---

## 11. KI-Übersetzung & UI-Helfer (optional)

```bash
pnpm add @sanity/assist            # KI-Übersetzung im Studio
pnpm add @sanity/language-filter   # Sprachen ein-/ausblenden
```

```typescript
// sanity.config.ts (plugins[])
import {assist} from '@sanity/assist'

assist({
  translate: {
    document: {languageField: 'language'},          // Document-Level
    field: {                                          // Field-Level
      languages: (client) =>
        client.fetch(`*[_type == "locale"]{ "id": tag, "title": name }`),
      documentTypes: ['skill', 'category'],
    },
  },
}),
```

---

## 12. Stolperfallen

- **Duplikation nicht-übersetzbarer Felder (Document-Level):** Bild, Datum, Preis
  liegen in jeder Sprachversion separat. Änderst du das Bild auf DE, ist EN/FR
  noch alt. → Entweder bewusst pflegen, oder solche Daten in ein sprachneutrales
  Referenz-Dokument auslagern.
- **Keine "US- vs. UK-English"-Fastkopien** — Duplikation vermeiden, lieber über
  Portable-Text-Marks kleine Wortunterschiede lösen.
- **Redakteur-Experience vor Frontend-Architektur:** Ansatz danach wählen, wie sich
  Content am besten pflegen lässt — nicht nach der Router-Struktur.
- **Eigene `_id` nur für Singletons** (`homePage-de`). Normale Dokumente: ID von
  Sanity generieren lassen.
- **Language-Tags konsistent** nach RFC 5646 (`de`, `en`, `fr`, ggf. `de-CH`).
- **Slug-Kollisionen:** Slug ist nur pro Sprache eindeutig — in der Query immer
  `language == $locale && slug.current == $slug` kombinieren.
- **`translation.metadata` nicht vergessen** beim Sprachumschalter — sonst zeigst
  du auf falsche/nicht existierende URLs.
- **`internationalized-array`: Sprache in `language`, nicht `_key`** (ab Plugin v5).
  Alte GROQ-Beispiele mit `field[_key == $locale]` liefern kein Ergebnis mehr →
  `field[language == $locale][0].value` verwenden.

---

## 13. Umsetzungs-Reihenfolge (TL;DR)

1. **Ansatz pro Dokumenttyp** festlegen (Abschnitt 1). Portfolio-Empfehlung:
   Document-Level für Seiten/Projekte/Posts, Field-Level für Skills/Kategorien.
2. **`locale`-Type** anlegen + drei Locale-Dokumente (de/en/fr) erstellen.
3. **`language`-Feld** in alle Document-Level-Schemas einbauen.
4. **Plugins** installieren & in `sanity.config.ts` konfigurieren
   + Initial Value Templates + `newDocumentOptions`.
5. **Structure** für lokalisierte Singletons.
6. **GROQ**-Queries mit Fallback schreiben.
7. **Next.js**: `[locale]`-Routing + Middleware + `<html lang>`.
8. **Sprachumschalter** über `translation.metadata`.
9. **SEO** zuletzt: hreflang + Sitemap.
