import { createFileRoute } from '@tanstack/react-router'
import BottomNavigation from '@/components/common/bottom-navigation'
import PageLayOut from '@/components/common/page-layout'
import PageTitle from '@/components/common/page-title'
import ProductList from '@/components/shop-screen/product-list'
import UserStatusbar from '@/components/shop-screen/user-statusbar'
import { useUserPoints } from '@/hooks/use-user-points'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import useItems from '@/hooks/item/use-items'
import useProducts from '@/hooks/product/use-products'

export const Route = createFileRoute('/point-shop/')({
  component: PointShop,
})

function PointShop() {
  const { data: points } = useUserPoints()

  const { currentBalance = 0, totalEarned = 0 } = points?.result || {}

  const totalEarnedPoints = totalEarned
  const currentPoints = currentBalance

  //현재 탭 상태
  const tabList = ['아이템', '배송상품'] as const
  const [currentTab, setCurrentTab] = useState<(typeof tabList)[number]>('아이템')
  const handleTabClick = (tab: '아이템' | '배송상품') => {
    setCurrentTab(tab)
  }

  const { data: products, isLoading: productsIsLoading } = useProducts()

  const { data: items, isLoading: itemsIsLoading } = useItems()
  // 추후 sellingStatus값 처리예정
  const mappedItems = items?.pages[0]?.result?.content?.map((i) => ({
    id: i.pointItemId,
    name: i.pointItemName,
    thumbnailUrl: i.thumbnailUrl,
    price: i.pointPrice,
  }))

  const currentProducts = currentTab === '배송상품' ? products : mappedItems
  return (
    <PageLayOut.Container>
      <PageLayOut.ScrollableContent>
        <PageLayOut.HeaderSection>
          <PageTitle>포인트상점</PageTitle>
        </PageLayOut.HeaderSection>
        <PageLayOut.BodySection className="p-0">
          <UserStatusbar accumulatedPoint={totalEarnedPoints} availablePoint={currentPoints} />

          {/* 분류 탭 */}
          <div className="flex">
            {tabList.map((tab) => (
              <div
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  `text-lighter-gray relative flex-1 cursor-pointer border-b border-gray-500 py-3.5 font-bold`,
                  currentTab === tab && 'text-mountain_meadow-500',
                )}
              >
                <span>{tab}</span>
                {currentTab === tab && (
                  <div className="bg-mountain_meadow-500 absolute top-full left-0 h-1 w-full -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>

          <ProductList
            products={currentProducts ?? []}
            isLoading={currentTab === '배송상품' ? productsIsLoading : itemsIsLoading}
          />
        </PageLayOut.BodySection>
      </PageLayOut.ScrollableContent>
      <PageLayOut.FooterSection>
        <BottomNavigation />
      </PageLayOut.FooterSection>
    </PageLayOut.Container>
  )
}

export default PointShop
