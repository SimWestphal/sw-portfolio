// apps/studio/src/hooks/useSkillUsage.ts
import {useEffect, useState} from 'react'
import {useClient} from 'sanity'

const API_VERSION = '2025-02-19'

const SKILL_USAGE_QUERY = `{
  "count": count(*[
    !(_id in path("drafts.**")) &&
    _id != $skillId &&
    references($skillId)
  ]),
  "projects": *[
    !(_id in path("drafts.**")) &&
    _id != $skillId &&
    references($skillId)
  ]{
    _id,
    _type,
    "title": coalesce(title[language == "de"][0].value, title, name[language == "de"][0].value)
  }
}`

export type SkillUsage = {
  count: number
  projects: {_id: string; title: string | null}[]
}

export function useSkillUsage(documentId: string) {
  const client = useClient({apiVersion: API_VERSION})
  const [data, setData] = useState<SkillUsage | null>(null)
  const [error, setError] = useState<Error | null>(null)

  // Im View-Pane kann die ID eine Draft-ID sein — Referenzen zeigen aber
  // immer auf die published ID.
  const skillId = documentId.replace(/^drafts\./, '')

  useEffect(() => {
    let cancelled = false

    client
      .fetch<SkillUsage>(SKILL_USAGE_QUERY, {skillId})
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err as Error)
      })

    return () => {
      cancelled = true
    }
  }, [client, skillId])

  return {data, error, isLoading: !data && !error}
}
