import {TranslateIcon} from '@sanity/icons/Translate'
import {defineField, defineType} from 'sanity'
export const locale = defineType({
  name: 'locale',
  title: 'locale',
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
