import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'siteSettings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'text',
      rows: 3,
    }),
  ],
})
