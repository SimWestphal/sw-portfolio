import {SlugValidationContext} from 'sanity'

export async function isSlugUniquePerLanguage(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context
  if (!document) return true
  const language = document.language
  if (!language) return true
  const client = getClient({apiVersion: '2025-07-09'})

  // Extract base ID to handle drafts correctly
  const id = document._id.replace(/^drafts\./, '')

  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type: document._type,
    language,
  }

  // Query looks for other documents of the same type and language with the same slug
  const query = `!defined(*[
    _type == $type && 
    slug.current == $slug && 
    language == $language &&
    _id != $draft && 
    _id != $published
  ][0]._id)`

  const result = await client.fetch(query, params)

  // If a matching document is found, the slug is NOT unique (returns false)
  return result
}
