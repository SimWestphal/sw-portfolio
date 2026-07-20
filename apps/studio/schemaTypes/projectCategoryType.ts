import {defineField, defineType} from 'sanity'

export const projectCategory = defineType({
  type: 'document',
  name: 'projectCategory',
  title: 'projectCategory',
  fields: [defineField({type: 'internationalizedArrayString', name: 'name', title: 'name'})],
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
