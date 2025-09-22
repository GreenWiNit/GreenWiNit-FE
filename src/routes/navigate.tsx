import PageLayOut from '@/components/common/page-layout'
import { createFileRoute } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'

export const Route = createFileRoute('/navigate')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageLayOut.Container>
      <PageLayOut.BodySection>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-mountain_meadow-500 font-bold whitespace-pre-line">{`새로운 도메인이 개설되었습니다.\n기존 도메인에 머무르시겠습니까?`}</h3>
            <p className="text-ring text-sm font-bold">
              그로 인해 기존 도메인과 새로운 도메인이 분리되었습니다.
            </p>
            <div className="flex flex-col justify-baseline">
              <div className="flex cursor-pointer flex-row justify-baseline gap-2 p-4">
                <MoveRight color="#0fba7e" />
                <a href="http://greenwinit.com" className="text-mountain_meadow-500 font-bold">
                  새로운 도메인으로 이동하기
                </a>
              </div>
              <div className="flex cursor-pointer flex-row justify-baseline gap-2 p-4">
                <MoveRight color="#0fba7e" />
                <a href="http://greenwinit.store" className="text-mountain_meadow-500 font-bold">
                  기존 도메인에 머무르기
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageLayOut.BodySection>
    </PageLayOut.Container>
  )
}
