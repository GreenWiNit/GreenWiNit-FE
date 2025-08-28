import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import ChallengeTitle from '@/components/common/challenges/challenge-title'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { Button } from '@/components/common/button'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SquareCheckBig } from 'lucide-react'
import { Users as GroupsIcon } from 'lucide-react'
import BottomNavigation from '@/components/common/bottom-navigation'
import TeamCard from '@/components/common/teams/team-card'
import { useState } from 'react'

export const Route = createFileRoute('/challenges/$challenge-id/teams/')({
  component: ChallengesTeam,
})

function ChallengesTeam() {
  const challengeId = Number(Route.useParams()['challenge-id'])
  const navigate = useNavigate()
  const [pagination, _setPagination] = useState<{ cursor: number | null; pageSize: number | null }>(
    {
      cursor: null,
      pageSize: null,
    },
  )

  const { data: joinedTeams } = useQuery({
    queryKey: challengesQueryKeys.challenges.joinedTeams(challengeId).queryKey,
    queryFn: () => challengesApi.getJoinedTeamsMine({ challengeId, ...pagination }),
    enabled: challengeId != null,
    select: (data) => data.result?.content ?? [],
  })

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageLayOut.HeaderSection.BackIcon />
          <PageTitle>나의 팀</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection>
          <ChallengeTitle challengeId={challengeId} challengeType={CHALLENGE_TYPE} />
          {joinedTeams?.length ? (
            <div className="flex flex-col gap-4 py-4">
              {joinedTeams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onClick={() =>
                    navigate({ to: `/challenges/${challengeId}/teams/${team.id}/joined` })
                  }
                  // 내가 이미 조인한 팀이어서 팀의 정보를 보고자 함
                  forceEnableButton
                  isCertified={team.certified}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 items-center justify-center">
                <span className="text-lg font-bold text-[#c0c0c0]">
                  팀을 선택하거나 등록해주세요.
                </span>
              </div>
            </div>
          )}
          <div className="mt-auto flex w-full gap-2">
            <Button
              size="flex"
              onClick={() => navigate({ to: `/challenges/${challengeId}/teams/join` })}
            >
              <SquareCheckBig />팀 선택하기
            </Button>
            <Button
              size="flex"
              onClick={() => navigate({ to: `/challenges/${challengeId}/teams/enroll` })}
            >
              <GroupsIcon />팀 등록하기
            </Button>
          </div>
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}
const CHALLENGE_TYPE = 'team'

export default ChallengesTeam
