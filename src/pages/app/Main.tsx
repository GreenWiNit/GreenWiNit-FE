import AppTitle from '@/components/common/AppTitle'
import BottomNavigation from '@/components/common/BottomNav'
import UserCard from '@/components/home-screen/UserCard'

function Main() {
  return (
    <div className="flex h-full w-full flex-col bg-[#F5F9F7]">
      <div className="flex h-12 w-full items-center justify-center bg-white">
        <AppTitle className="!text-3xl" />
      </div>
      <div className="mt-5 p-4">
        <UserCard />
        <button className="!bg-mountain_meadow mt-6 w-full rounded-lg p-4 text-base font-bold text-white">
          참여 챌린지
        </button>
      </div>
      <div className="mt-4 flex w-full flex-row">
        <button className="border-b-mountain_meadow text-mountain_meadow h-full w-full border-b-[4px] p-2 font-bold">
          개인
        </button>
        <button className="h-full w-full p-2">팀</button>
      </div>
      <div className="flex w-full flex-col p-4 pt-8">
        <div className="flex flex-row gap-1">
          <span className="text-xl font-bold text-[#404040]">개인 챌린지</span>
          <img src="/icons/infocircle.svg" />
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <div className="rounded- flex flex-col bg-white shadow-lg">
            <div className="w-full rounded-t-lg">
              <img src="/img/3.png" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-1 p-3 text-start">
              <span className="text-sm font-bold text-[#404040]">오늘은 따릉이 타는날</span>
              <span className="text-sm text-[#737373]">25.08.01 ~ 08.30</span>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white shadow-lg">
            <div className="w-full">
              <img src="/img/3.png" />
            </div>
            <div className="flex h-full flex-1 flex-col gap-1 p-3 text-start">
              <span className="text-sm font-bold text-[#404040]">오늘은 따릉이 타는날</span>
              <span className="text-sm text-[#737373]">25.08.01 ~ 08.30</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
}

export default Main
