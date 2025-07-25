import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import UpsertPageBody from '@/components/common/teams/UpsertPageBody'
import { FormState, UpsertPageBodyProps } from '@/components/common/teams/UpsertPageBody/types'
import useChallengesTeam from '@/hooks/useChallengesTeam'

dayjs.extend(customParseFormat)

const TeamModify = () => {
  const params = useParams<{ challengeId: string; teamId: string }>()
  const challengeId = params.challengeId
  const teamId = params.teamId
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: team, isLoading } = useChallengesTeam(challengeId, teamId)

  const { mutate: modifyTeam } = useMutation({
    mutationFn: async (team: FormState) => {
      const { id, ...rest } = team
      if (id == null) {
        throw new Error('team.id is required')
      }
      await challengesApi.modifyTeam({
        ...rest,
        id,
        startAt: dayjs(rest.startAt).format('HH:mm'),
        endAt: dayjs(rest.endAt).format('HH:mm'),
        date: dayjs(rest.date).format('YYYY-MM-DD'),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.list().queryKey })
      queryClient.invalidateQueries({ queryKey: challengesQueryKeys.detail(challengeId).queryKey })
      navigate(`/challenges/${challengeId}/teams`)
    },
    onError(error) {
      console.error(error)
      toast.error(error.message)
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (team == null) {
    // @TODO redirect to 500 page
    return <div>Server Error</div>
  }

  const onSubmit: UpsertPageBodyProps['onSubmit'] = (data) => {
    modifyTeam(data)
  }

  return (
    <PageContainer bg="form">
      <PageHeaderSection>
        <PageHeaderSection.BackIcon />
        <PageTitle>수정하기</PageTitle>
      </PageHeaderSection>
      <UpsertPageBody
        mode="modify"
        onSubmit={onSubmit}
        initialData={{
          ...team,
          date: dayjs(team.date).toDate(),
          startAt: dayjs(team.startAt, 'HH:mm').toDate(),
          endAt: dayjs(team.endAt, 'HH:mm').toDate(),
        }}
      />
    </PageContainer>
  )
}

export default TeamModify
