import BottomNavigation from '@/components/common/BottomNav'
import PageContainer from '@/components/common/PageContainer'
import ProductList from '@/components/shop-screen/ProductList'
import UserStatusbar from '@/components/shop-screen/UserStatusbar'
import { useUserStatus } from '@/hooks/useUserStatus'

function PointShop() {
  const { data: userStatus } = useUserStatus()

  return (
    <PageContainer>
      <div className="flex h-[48px] w-full items-center justify-center bg-white py-8">
        <span className="text-[24px] font-bold text-black">포인트상점</span>
      </div>
      <div className="h-[48]px flex w-full items-center justify-center">
        <UserStatusbar point={userStatus?.point ?? 0} availablePoint={userStatus?.point ?? 0} />
      </div>
      <div className="scrollbar-hide flex flex-1 overflow-y-auto">
        <ProductList />
      </div>
      <BottomNavigation />
    </PageContainer>
  )
}

export default PointShop
