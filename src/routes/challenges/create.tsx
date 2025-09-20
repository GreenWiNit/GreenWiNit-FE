import ImageUploader from '@/components/common/image-uploader'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import { Label } from '@radix-ui/react-label'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const Route = createFileRoute('/challenges/create')({
  component: RouteComponent,
})

interface FormData {
  type: 'individual' | 'team'
  title: string
  approach: string
  thumbnail: FileList | null
}

function RouteComponent() {
  const navigate = useNavigate()
  const { control, register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      type: 'individual',
      title: '',
      approach: '',
      thumbnail: null,
    },
  })

  const selectedType = watch('type')

  const handleBackButton = () => {
    navigate({ to: '/challenges' })
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
    toast.success('폼이 성공적으로 제출되었습니다.')
  }

  return (
    <PageLayOut.Container>
      <PageLayOut.HeaderSection className="relative">
        <PageTitle className="flex items-center justify-center">
          <ChevronLeft
            size={24}
            className="absolute left-4 cursor-pointer"
            onClick={handleBackButton}
          />
          <p>챌린지 생성하기</p>
        </PageTitle>
      </PageLayOut.HeaderSection>
      <div className="m-4 mb-auto flex flex-col items-baseline gap-2">
        <Label>
          유형 <span className="text-red-500">*</span>
        </Label>
        <div className="grid w-full grid-cols-2 gap-2">
          <Controller
            name="type"
            control={control}
            rules={{ required: '유형을 선택해주세요' }}
            render={({ field }) => (
              <>
                <Button
                  type="button"
                  variant={selectedType === 'individual' ? 'default' : 'outline'}
                  className={`h-12 ${selectedType === 'individual' ? 'bg-mountain_meadow-500 text-white hover:bg-green-600' : ''}`}
                  onClick={() => field.onChange('individual')}
                >
                  개인
                </Button>
                <Button
                  type="button"
                  variant={selectedType === 'team' ? 'default' : 'outline'}
                  className={`h-12 ${selectedType === 'team' ? 'bg-mountain_meadow-500 text-white hover:bg-green-600' : ''}`}
                  onClick={() => field.onChange('team')}
                >
                  팀
                </Button>
              </>
            )}
          />
        </div>
        <Label>
          제목 <span className="text-red-500">*</span>
        </Label>
        <Input {...register('title', { required: '제목 입력해주세요.' })} />
        <Label>
          참여방법 <span className="text-red-500">*</span>
        </Label>
        <Input {...register('title', { required: '참여 방법을 입력해주세요.' })} />
        <Label>
          소개 이미지 <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => <ImageUploader value={field?.value} onChange={field?.onChange} />}
        />
      </div>
      <div className="m-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-mountain_meadow-500 w-full p-6 text-white hover:bg-green-600"
        >
          등록하기
        </Button>
      </div>
    </PageLayOut.Container>
  )
}
