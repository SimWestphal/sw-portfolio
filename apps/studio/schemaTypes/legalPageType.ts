import {DocumentIcon} from '@sanity/icons/Document'
import {defineField, defineType} from 'sanity'
import {isSlugUniquePerLanguage} from '../helpers/isSlugUniquePerLanguage'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Rechtstext',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Inhalt',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        // Highlights duplicates only if they share the same locale
        isUnique: isSlugUniquePerLanguage,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', language: 'language'},
    prepare({title, language}) {
      return {title: title ?? 'Rechtstext', subtitle: language?.toUpperCase()}
    },
  },
})
