import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  type: 'document',
  name: 'project',
  title: 'project',
  fields: [
    defineField({type: 'internationalizedArrayString', name: 'name', title: 'name'}),
    defineField({
      type: 'internationalizedArrayString',
      name: 'shortDescription',
      title: 'shortDescription',
    }),
    defineField({
      type: 'internationalizedArrayPortableText',
      name: 'description',
      title: 'description',
    }),
    defineField({
      type: 'array',
      name: 'skills',
      title: 'skills',
      of: [defineArrayMember({type: 'reference', to: [{type: 'skill'}]})],
    }),
    defineField({
      type: 'date',
      name: 'projectStart',
      title: 'projectStart',
      options: {
        dateFormat: 'MM/YYYY',
      },
    }),
    defineField({
      type: 'date',
      name: 'projectEnd',
      title: 'projectEnd',
      options: {
        dateFormat: 'MM/YYYY',
      },
    }),
    defineField({
      type: 'reference',
      name: 'projectCategory',
      title: 'projectCategory',
      to: [{type: 'projectCategory'}],
    }),
    defineField({
      type: 'reference',
      name: 'company',
      title: 'company',
      to: [{type: 'company'}],
    }),
    defineField({
      type: 'reference',
      name: 'role',
      title: 'role',
      to: [{type: 'role'}],
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
