import ChallengeTitle from '@/components/common/challenges/challenge-title'
import TeamCard from '@/components/common/teams/team-card'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import useChallengesTeams from '@/hooks/challenge/use-challenges-teams'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import BottomNavigation from '@/components/common/bottom-navigation'
import { useState } from 'react'

export const Route = createFileRoute('/challenges/$challenge-id/teams/join')({
  component: JoinTeam,
})

function JoinTeam() {
  const challengeId = Number(Route.useParams()['challenge-id'])
  const [pagination, _setPagination] = useState<{ cursor: number | null; pageSize: number | null }>(
    {
      cursor: null,
      pageSize: null,
    },
  )

  const navigate = useNavigate()
  const { data } = useChallengesTeams({ challengeId, ...pagination })
  const teams = data?.result?.content ?? []

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageLayOut.HeaderSection.BackIcon />
          <PageTitle>팀 선택하기</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection className="gap-4">
          <ChallengeTitle challengeId={challengeId} challengeType="team" />
          <div className="flex flex-1 flex-col gap-4">
            {teams.length ? (
              teams.map((team) => (
                <TeamCard
                  key={team.id}
                  onClick={() => {
                    navigate({ to: `/challenges/${challengeId}/teams/${team.id}` })
                  }}
                  team={team}
                />
              ))
            ) : (
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-lg font-bold text-[#c0c0c0]">
                    아직 등록된 팀이 없습니다.
                    <br />
                    [홈] - [참여 챌린지]에서
                    <br />
                    가장 먼저 팀을 등록해주세요!
                  </p>
                </div>
              </div>
            )}
          </div>
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default JoinTeam
