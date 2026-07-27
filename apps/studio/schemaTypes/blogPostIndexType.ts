// schemas/blogIndex.ts
import {defineField, defineType} from 'sanity'

export const blogPostIndex = defineType({
  name: 'blogPostIndex',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'intro', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
  ],
})
