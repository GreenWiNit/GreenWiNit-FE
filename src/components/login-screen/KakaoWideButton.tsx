import { cn } from '@/lib/utils'

type KakaoWideButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const KakaoWideButton = (props: KakaoWideButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'relative flex h-[50px] w-full items-center justify-center rounded-[10px] !bg-[#FEE500] pl-5',
      )}
    >
      <img src="/img/kakao.png" alt="카카오로그인" width={20} className="absolute left-5" />
      <span>카카오 계정으로 로그인</span>
    </button>
  )
}

export default KakaoWideButton
