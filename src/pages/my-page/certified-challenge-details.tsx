import { useParams } from 'react-router-dom'
import { useCertifiedChallengeDetails } from '@/hooks/challenge/use-certified-challenge-details'
import Row from '@/components/common/form/row'
import MyPageLayout from '@/pages/my-page/my-page-layout'

function CertifiedChallengeDetails() {
  const { challengeId } = useParams<{ challengeId: string }>()
  const { data } = useCertifiedChallengeDetails(Number(challengeId))

  const info = data?.result

  if (!info) return <div>데이터를 불러오는 중...</div>

  return (
    <MyPageLayout title="인증 챌린지" showBottomNavigation={true}>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Row>
          <h3>제목</h3>
          <div className="w-full rounded-[10px] border border-[#c0c0c0] bg-white p-4 text-start">
            {/* @TODO info.title 생기면 '제목 없음' 대체할 예정 */}
            <span className="text-secondary-foreground text-base">제목 없음</span>
          </div>
        </Row>
        <Row>
          <h3>날짜</h3>
          <div className="flex w-full gap-3 rounded-[10px] border border-[#c0c0c0] bg-white p-4">
            <img src="/icons/calendar.svg" alt="달력 아이콘" width={24} height={24} />
            <span className="text-secondary-foreground text-base">{info.certifiedDate} </span>
          </div>
        </Row>
        <Row>
          <h3>대표 이미지</h3>
          <img src={info.certificationImageUrl} alt="대표 이미지" width={340} height={160} />
        </Row>
        <Row>
          <h3>간단한 후기를 남겨주세요.</h3>
          <div className="min-h-20 w-full rounded-[10px] border border-[#c0c0c0] bg-white p-4 text-start">
            <span className="text-secondary-foreground text-sm">{info.certificationReview}</span>
          </div>
        </Row>
      </div>
    </MyPageLayout>
  )
}

export default CertifiedChallengeDetails
