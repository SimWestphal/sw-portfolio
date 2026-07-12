import {defineField, defineType} from 'sanity'

export const skill = defineType({
  type: 'document',
  name: 'skill',
  title: 'skill',
  fields: [
    defineField({type: 'internationalizedArrayString', name: 'name', title: 'name'}),
    defineField({
      type: 'reference',
      name: 'category',
      title: 'category',
      to: [{type: 'skillcategory'}],
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
