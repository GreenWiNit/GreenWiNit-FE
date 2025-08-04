import { Button as OriginalButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function InternalServerError() {
  const isInRouter = useIsInRouter()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <h1>Error 500</h1>
      <p>일시적인 오류가 발생했습니다.</p>
      <p className="text-light-gray">
        서비스 이용에 불편을 드려 죄송합니다.
        <br />
        잠시 후 다시 이용해주세요.
      </p>
      <div className="flex w-full flex-row justify-center gap-4">
        {isInRouter ? <InternalServerErrorInRouter /> : <InternalServerErrorWithoutRouter />}
      </div>
    </div>
  )
}

function useIsInRouter() {
  try {
    useNavigate()
    return true
  } catch (_) {
    return false
  }
}

const InternalServerErrorWithoutRouter = () => {
  return (
    <Button type="button" onClick={() => window.history.go(-1)} size="flex">
      이전 페이지
    </Button>
  )
}

const InternalServerErrorInRouter = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex w-full flex-row justify-center gap-4">
      {location.pathname !== '/500' ? (
        <Button type="button" onClick={() => window.location.reload()} variant="cancel" size="flex">
          새로고침
        </Button>
      ) : null}
      <Button type="button" onClick={() => navigate(-1)} size="flex">
        이전 페이지
      </Button>
    </div>
  )
}

const Button = ({ ...props }: ComponentProps<typeof OriginalButton>) => {
  return <OriginalButton {...props} className={cn('h-fit max-w-40', props.className)} />
}
