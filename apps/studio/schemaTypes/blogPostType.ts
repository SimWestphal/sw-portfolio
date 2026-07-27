import {DocumentIcon} from '@sanity/icons/Document'
import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'publishedAt', type: 'datetime'}),
    defineField({name: 'body', type: 'array', of: [{type: 'block'}]}),
  ],
})
