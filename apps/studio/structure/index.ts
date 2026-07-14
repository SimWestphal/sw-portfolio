import {DocumentIcon} from '@sanity/icons/Document'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

const LOCALES = ['de', 'en', 'es']

function localizedLegalPage(
  S: StructureBuilder,
  idBase: 'impressum' | 'datenschutz',
  title: string,
) {
  return S.listItem()
    .title(title)
    .icon(DocumentIcon)
    .child(
      S.list()
        .title(title)
        .items(
          LOCALES.map((locale) =>
            S.listItem()
              .title(`${title} (${locale.toUpperCase()})`)
              .child(
                S.document()
                  .schemaType('legalPage')
                  .documentId(`${idBase}-${locale}`)
                  .initialValueTemplate('legalPage-byLang', {language: locale})
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
      localizedLegalPage(S, 'impressum', 'Impressum'),
      localizedLegalPage(S, 'datenschutz', 'Datenschutz'),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'legalPage'),
    ])
