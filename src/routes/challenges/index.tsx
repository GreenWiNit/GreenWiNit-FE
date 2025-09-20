import BottomNavigation from '@/components/common/bottom-navigation'
import Challenge from '@/components/common/challenge'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { Button } from '@/components/shadcn/button'
import { useChallenges } from '@/hooks/challenge/use-challenges'
import { cn } from '@/lib/utils'
import { ChallengeTabProps, ChallengeType } from '@/types/challenge'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PlusCircle, Search } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/challenges/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    const tab = search['tab'] as string
    const validTab: ChallengeType = ['individual', 'team'].includes(tab)
      ? (tab as ChallengeType)
      : 'individual'

    return { tab: validTab }
  },
})

const ChallengeTab = ({ onTabChange, activeTab }: ChallengeTabProps) => {
  const tabs = [
    { key: 'individual' as const, label: '개인' },
    { key: 'team' as const, label: '팀' },
  ]

  return (
    <div className="flex flex-row">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn(
            'flex flex-1 items-center justify-center px-4 py-2',
            activeTab === tab.key
              ? 'border-b-mountain_meadow-500 text-mountain_meadow-500 border-b-2'
              : 'text-gray-600 hover:text-gray-800',
          )}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate({ from: Route.fullPath })
  const { tab } = Route.useSearch()
  const { data: challenges } = useChallenges({ challengeType: tab as ChallengeType })

  const handleTabChange = (newTab: ChallengeType) => {
    navigate({
      search: { tab: newTab },
    })
    setSearchQuery('')
  }

  const handleMyChallenge = () => {
    navigate({ to: '/my-page/challenges/certified' })
  }

  const handleAddChallenge = () => {
    navigate({ to: '/challenges/create' })
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageTitle>챌린지</PageTitle>
        </PageLayOut.HeaderSection>
        <ChallengeTab onTabChange={handleTabChange} activeTab={tab} />
        <div className="m-2 flex justify-between gap-2 rounded-3xl border border-gray-400 py-2 pr-2 pl-4">
          <input
            placeholder="검색 기능은 지금 개발중에 있어요!"
            type="text"
            className="w-full outline-0"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            disabled={true}
          />
          <Search color="gray" />
        </div>
        <div className="relative mx-2 grid grid-cols-2 gap-4">
          {challenges?.map((challenge) => (
            <Challenge
              key={challenge.id}
              challenge={challenge}
              onClick={() => {
                navigate({
                  to: `/challenges/${challenge.id}/detail`,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  search: { challengeType: tab } as any,
                })
              }}
            />
          ))}
        </div>
        <div className="absolute right-6 bottom-32 z-10 opacity-50">
          <PlusCircle
            color="black"
            fill="#D9D9D9"
            size={48}
            strokeWidth={1}
            className="cursor-pointer"
            onClick={handleAddChallenge}
          />
        </div>
      </PageLayOut.ScrollableContent>
      <Button
        className="bg-mountain_meadow-500 m-2 p-4 text-sm text-white"
        onClick={handleMyChallenge}
      >
        내가 참여한 챌린지
      </Button>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}
