import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import BackIcon from '@mui/icons-material/ChevronLeft'
import { useQuery } from '@tanstack/react-query'
import { challengesApi, challengesQueryKeys } from '@/api/challenges'
import LogoIcon from '@/components/common/LogoIcon'
import BottomNavigation from '@/components/common/BottomNav'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'

const ChallengeDetail = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  const navigate = useNavigate()

  const { data: challenge } = useQuery({
    queryKey: challengesQueryKeys.detail(id).queryKey,
    queryFn: () => challengesApi.getChallengeDetail(id),
  })

  return (
    <PageContainer>
      <PageHeaderSection>
        <BackIcon
          className="absolute left-4 cursor-pointer"
          fontSize="large"
          onClick={() => navigate(-1)}
        />
        <PageTitle>{`${challenge?.typeKo} 챌린지 상세보기`}</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-row items-center justify-start gap-1.5">
          <LogoIcon size="small" className="border-none bg-transparent bg-size-[20px]" />
          <h2 className="text-xl font-bold">{challenge?.name}</h2>
        </div>
        <div className="flex w-full flex-1 flex-col gap-4 rounded-xl bg-white p-4">
          <img
            src={challenge?.thumbnailUrl}
            alt={challenge?.name}
            className="w-full rounded-xl object-cover"
          />
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-lg font-bold">기본정보</h3>
            <div className="bg-card w-full items-center justify-center p-4">
              <p className="text-card-head text-start">
                기간
                <br />
                <span className="text-card-base">
                  {challenge == null
                    ? null
                    : `${dayjs(challenge.startAt).format('YYYY.MM.DD')} ~ ${dayjs(challenge.endAt).format('YYYY.MM.DD')}`}
                </span>
              </p>
            </div>
            <div className="bg-card w-full items-center justify-center p-4">
              <p className="text-card-head text-start">
                참여방법
                <br />
                <span className="text-card-base">
                  {challenge == null ? null : challenge.howToJoin}
                </span>
              </p>
            </div>
            <div className="bg-card w-full items-center justify-center p-4">
              <p className="text-card-head text-start">
                포인트
                <br />
                <span className="text-card-base">
                  {challenge == null ? null : `${challenge.point}P (1회 인증 기준)`}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* @TODO attach click event handler */}
        <Button className="mt-auto">챌린지 참여하기</Button>
      </div>
      <BottomNavigation />
    </PageContainer>
  )
}

export default ChallengeDetail
