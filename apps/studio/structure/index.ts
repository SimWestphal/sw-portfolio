import CogIcon from '@sanity/icons/Cog'
import {DocumentIcon} from '@sanity/icons/Document'
import MenuIcon from '@sanity/icons/Menu'
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
                  .initialValueTemplate('legalPage-by-language', {language: locale})
                  .title(`${title} (${locale.toUpperCase()})`),
              ),
          ),
        ),
    )
}

function localizedNavigation(S: StructureBuilder) {
  return S.listItem()
    .title('Navigationen')
    .icon(MenuIcon)
    .child(
      S.list()
        .title('Navigationen nach Sprache')
        .items(
          LOCALES.map((locale) =>
            S.listItem()
              .title(`Navigation (${locale.toUpperCase()})`)
              .child(
                S.documentList()
                  .title(`Navigation (${locale.toUpperCase()})`)
                  .schemaType('navigation')
                  .filter('_type == "navigation" && language == $locale')
                  .params({locale})
                  .initialValueTemplates([
                    S.initialValueTemplateItem('navigation-by-language') // Nur die ID hier
                      .templateId('navigation-by-language') // Explizit für v4 erzwingen
                      .parameters({language: locale}), // Die Parameter anhängen
                  ]),
              ),
          ),
        ),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalt')
    .items([
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Einstellungen & Konfiguration')
            .items([
              S.listItem()
                .title('Allgemeine Website-Einstellungen')
                .icon(CogIcon)
                .child(
                  S.list()
                    .title('Website-Einstellungen nach Sprache')
                    .items(
                      LOCALES.map((locale) =>
                        S.listItem()
                          .title(`Einstellungen (${locale.toUpperCase()})`)
                          .icon(CogIcon)
                          .child(
                            S.document()
                              .schemaType('siteSettings')
                              .documentId(`siteSettings-${locale}`)
                              .initialValueTemplate('siteSettings-by-language', {language: locale})
                              .title(`Einstellungen (${locale.toUpperCase()})`),
                          ),
                      ),
                    ),
                ),

              localizedNavigation(S),

              S.documentTypeListItem('locale').title('Sprachen (Locales)'),

              S.listItem()
                .title('Rechtliche Texte')
                .icon(DocumentIcon)
                .child(
                  S.list()
                    .title('Rechtliche Texte')
                    .items([
                      localizedLegalPage(S, 'impressum', 'Impressum'),
                      localizedLegalPage(S, 'datenschutz', 'Datenschutz'),
                    ]),
                ),
            ]),
        ),

      S.divider(),

      // Filtert alle manuell verbauten Typen aus der automatischen Liste aus
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'legalPage' &&
          item.getId() !== 'navigation' &&
          item.getId() !== 'siteSettings' &&
          item.getId() !== 'locale',
      ),
    ])
