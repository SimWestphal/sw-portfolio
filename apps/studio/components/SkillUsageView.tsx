// apps/studio/src/components/SkillUsageView.tsx
import {Card, Flex, Spinner, Stack, Text} from '@sanity/ui'
import type {UserViewComponent} from 'sanity/structure'
import {useSkillUsage} from '../hooks/useSkillUsage'

export const SkillUsageView: UserViewComponent = ({documentId}) => {
  const {data, error, isLoading} = useSkillUsage(documentId)

  if (isLoading) {
    return (
      <Flex align="center" justify="center" padding={5}>
        <Spinner muted />
      </Flex>
    )
  }

  if (error) {
    return (
      <Card padding={4} tone="critical">
        <Text size={1}>Verwendung konnte nicht geladen werden: {error.message}</Text>
      </Card>
    )
  }

  return (
    <Stack padding={4} space={4}>
      <Text size={3} weight="semibold">
        {data!.count === 0
          ? 'In keinem Projekt verwendet'
          : `In ${data!.count} ${data!.count === 1 ? 'Projekt' : 'Projekten'} verwendet`}
      </Text>

      <Stack space={2}>
        {data!.projects.map((project) => (
          <Card key={project._id} padding={3} radius={2} shadow={1}>
            <Text size={1}>{project.title ?? '(ohne Titel)'}</Text>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}
