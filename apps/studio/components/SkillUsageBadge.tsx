// apps/studio/components/skillUsageBadge.tsx
import type {DocumentBadgeComponent} from 'sanity'
import {useSkillUsage} from '../hooks/useSkillUsage'

export const skillUsageBadge: DocumentBadgeComponent = (props) => {
  const {data} = useSkillUsage(props.id)

  if (!data) return null

  return {
    label: `${data.count}× verwendet`,
    color: data.count === 0 ? 'warning' : 'success',
  }
}
