import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  type: 'document',
  name: 'navigation',
  title: 'navigation',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'name',
    }),
    defineField({
      name: 'navigationItem',
      title: 'navigationItem',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navigationItem',

          fields: [
            defineField({type: 'string', name: 'name', title: 'name'}),
            defineField({type: 'string', name: 'icon', title: 'icon'}),
            defineField({
              name: 'linkType',
              title: 'linkType',
              type: 'string',
              options: {
                list: [
                  {title: 'internal', value: 'internal'},
                  {title: 'anchor', value: 'anchor'},
                ],
                layout: 'radio',
              },
              initialValue: 'internal',
            }),

            defineField({
              name: 'internalLink',
              title: 'internalLink',
              type: 'reference',
              to: [{type: 'legalPage'}], // Ersetze 'page' mit dem Namen deines Seiten-Schemas
              hidden: ({parent}) => parent?.linktype !== 'internal',

              options: {
                filter: ({document}) => {
                  // Das Plugin speichert die Sprache automatisch im Feld 'language'
                  const currentLang = document?.language || 'de'

                  return {
                    // Filtert alle Seiten, deren ID auf das Sprachkürzel endet
                    filter: '_id match $pattern',
                    params: {pattern: `*-${currentLang}`},
                  }
                },
              },
            }),
            defineField({
              name: 'anchorLink',
              title: 'anchorLink',
              type: 'string',
              hidden: ({parent}) => parent?.linktype !== 'anchor',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'name'},
    prepare({title}) {
      const text = Array.isArray(title)
        ? (title.find((t) => t.language === 'de') ?? title[0])?.value
        : title
      return {title: text ?? 'Ohne Titel'}
    },
  },
})
