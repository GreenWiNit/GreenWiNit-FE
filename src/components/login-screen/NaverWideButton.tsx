import { cn } from '@/lib/utils'

type NaverWideButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const NaverWideButton = (props: NaverWideButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'relative flex h-[50px] w-full items-center justify-center rounded-[10px] !bg-[#03C75A] pl-5',
      )}
    >
      <img src="/img/naver.png" alt="네이버로그인" width={30} className="absolute left-3" />
      <span className="text-white">네이버 계정으로 로그인</span>
    </button>
  )
}

export default NaverWideButton
