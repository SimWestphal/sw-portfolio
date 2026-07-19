import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  type: 'document',
  name: 'navigation',
  title: 'navigation',
  fields: [
    defineField({type: 'internationalizedArrayString', name: 'name', title: 'name'}),
    defineField({type: 'string', name: 'icon', title: 'icon'}),
    defineField({type: 'internationalizedArrayString', name: 'anchor', title: 'anchor'}),
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
