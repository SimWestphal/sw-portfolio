// apps/studio/src/structure/defaultDocumentNode.ts
import {LinkIcon} from '@sanity/icons/Link'
import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import {SkillUsageView} from '../components/SkillUsageView'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType === 'skill') {
    return S.document().views([
      S.view.form(),
      S.view.component(SkillUsageView).title('Verwendung').icon(LinkIcon),
    ])
  }

  return S.document().views([S.view.form()])
}
