import PageContainer from '@/components/common/PageContainer'
import PageHeaderSection from '@/components/common/PageHeaderSection'
import PageTitle from '@/components/common/PageTitle'
import Required from '@/components/common/Required'
import { Input, Textarea } from '@/components/ui/input'
import BackIcon from '@mui/icons-material/ChevronLeft'
import { useNavigate } from 'react-router-dom'
import PlusIcon from '@mui/icons-material/Add'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

/**
 * 개인 챌린지 인증하기
 */
const ChallengeSubmit = () => {
  const navigate = useNavigate()
  // @TODO add form state

  return (
    <PageContainer>
      <PageHeaderSection>
        <BackIcon
          className="absolute left-4 cursor-pointer"
          fontSize="large"
          onClick={() => navigate(-1)}
        />
        <PageTitle>개인 챌린지 인증</PageTitle>
      </PageHeaderSection>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Row>
          <h3>
            제목
            <Required />
          </h3>
          <Input />
        </Row>
        <Row>
          <h3>
            날짜
            <Required />
          </h3>
          {/* @TODO add datepicker */}
          <Input />
        </Row>
        <Row>
          <h3>
            대표 이미지
            <Required />
          </h3>
          <InputUploadImage />
        </Row>
        <Row>
          <h3>
            간단한 후기를 남겨주세요.
            <Required />
          </h3>
          <Textarea placeholder="최대 글자수 45자 여러분의 이야기를 작성해주세요." />
        </Row>
        <p className="w-full text-center text-sm text-[#808080]">
          ※ 하나의 챌린지는 하루에 한번만 인증할 수 있어요!
          <br />
          다른 챌린지에 도전해보세요!
        </p>
        <Button variant="disabled" className="mt-auto box-border w-full p-6 text-lg">
          제출하기
        </Button>
      </div>
    </PageContainer>
  )
}

const InputUploadImage = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-[#f0f0f0] p-4"
      onClick={() => inputRef.current?.click()}
    >
      <div className="rounded-full border-[2px] border-[#3A9B6E] p-2">
        <PlusIcon htmlColor="#3A9B6E" />
      </div>
      <span className="text-bold text-[#666666]">이미지를 업로드 해주세요.</span>
      <span className="text-sm text-[#999999]">권장 크기: 1200 x 800px</span>
      <input type="file" ref={inputRef} className="hidden" />
    </div>
  )
}

const Row = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col items-start justify-start gap-1.5">{children}</div>
}

export default ChallengeSubmit
