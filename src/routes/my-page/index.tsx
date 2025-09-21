import { usersApi } from '@/api/users'
import UserCard from '@/components/common/user-card'
import { Card, CardAction, CardContent } from '@/components/shadcn/card'
import MyPageLayout from '@/components/my-page-screen/my-page-layout'
import { authStore } from '@/store/auth-store'
import { useNavigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { queryClient } from '@/constant/globals'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import WarnNotLoggedIn from '@/components/common/warn-not-logged-in'
import { useState } from 'react'

export const Route = createFileRoute('/my-page/')({
  component: MyPage,
})

function MyPage() {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState<boolean>(false)

  const CARD_ITEMS = [
    {
      category: 'SNS',
      items: [
        {
          title: '인스타그램',
          action: () => window.open('https://www.instagram.com/greenwinit/', '_blank'),
        },
        {
          title: '블로그',
          action: () => window.open('https://blog.naver.com/greenwinit_knock/', '_blank'),
        },
      ],
    },
    {
      category: '고객센터',
      items: [
        {
          title: '1:1문의',
          action: () =>
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSeeklgAO-RZjT5SAEqZV8FLIt8xArmyH1I4E1N0ePBVxCSQ1w/viewform?usp=sharing&ouid=113015203715321552511',
              '_blank',
            ),
        },
        {
          title: 'FAQ',
          action: () =>
            window.open(
              'https://www.notion.so/FAQ-2758079d7940808b8c2ae932d2b4848c?source=copy_link',
              '_blank',
            ),
        },
      ],
    },
    {
      category: '환경설정',
      items: [
        { title: '약관 및 정책', action: () => navigate({ to: '/terms' }) },
        { title: '회원정보수정', action: () => navigate({ to: '/my-page/edit-profile' }) },
        { title: '회원탈퇴', action: () => navigate({ to: '/my-page/withdraw' }) },
        {
          title: '로그아웃',
          action: async () => {
            if (authStore.getState().accessToken) {
              await usersApi.logout()
            }
            authStore.getState().initAccessToken()
            queryClient.clear()
            navigate({ to: '/' })
          },
        },
      ],
    },
  ]

  const handleClickItemButton = (action: (() => Promise<void>) | (() => Window | null)) => {
    if (!isLoggedIn) {
      setIsWarnNotLoggedInDialogOpen(true)
      return
    }
    action()
  }

  return (
    <MyPageLayout title="마이페이지" showBottomNavigation={true}>
      <div className="flex flex-col gap-8">
        <UserCard />
        {CARD_ITEMS.map((el, i) => {
          return (
            <Card
              key={i}
              className="border-lighter-gray-border h-fit rounded-2xl border bg-white p-0"
            >
              <CardContent className="flex flex-col px-0">
                <button className="flex w-full flex-row items-center justify-center p-4 font-bold">
                  {el.category}
                </button>
                {el.items.map((item, j) => (
                  <button onClick={() => handleClickItemButton(item.action)} key={j}>
                    <CardAction className="flex w-full flex-row items-center border-t-[1px] border-t-[9E9E9E] p-4">
                      <span className="text-title-smaller text-4">{item.title}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-auto"
                      >
                        <path d="M8 4L14 10L8 16" stroke="#9E9E9E" strokeWidth="2" />
                      </svg>
                    </CardAction>
                  </button>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>
      <WarnNotLoggedIn
        isOpen={isWarnNotLoggedInDialogOpen}
        onOpenChange={setIsWarnNotLoggedInDialogOpen}
        content="마이페이지"
      />
    </MyPageLayout>
  )
}

export default MyPage
