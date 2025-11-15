import { CircleAlert } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import Loading from '../common/loading'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import { RefObject, useState } from 'react'
import WarnNotLoggedIn from '../common/modal/warn-not-logged-in'

interface ProductListProps {
  products: {
    id: number
    name: string
    thumbnailUrl: string
    price: number
    sellingStatus?: string
  }[]
  isLoading: boolean
  bottomRef?: RefObject<HTMLDivElement | null>
}

const ProductList = ({ products, isLoading, bottomRef }: ProductListProps) => {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  const [isWarnNotLoggedInDialogOpen, setIsWarnNotLoggedInDialogOpen] = useState(false)

  const handleProductClick = (productId: number) => {
    if (!isLoggedIn) {
      setIsWarnNotLoggedInDialogOpen(true)
      return
    }
    navigate({ to: `/point-shop/products/${productId}/detail` })
  }

  if (isLoading) {
    return <Loading />
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <CircleAlert size={32} color="gray" />
        <p>상품이 준비 중입니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 self-center pt-4">
      {products?.map((product) => {
        return (
          <div
            key={product?.id}
            className="cursor-pointer items-center justify-center rounded-md text-start"
            onClick={() => handleProductClick(product?.id)}
          >
            <div className="border-lighter-gray-border mb-2 h-40 w-40 items-center justify-center rounded-[12px] border bg-white">
              <img
                className="h-full w-full items-center justify-center rounded-lg"
                src={product?.thumbnailUrl}
                alt={product?.name}
              />
            </div>
            <p className="text-sm font-bold whitespace-nowrap text-black">{product?.name}</p>
            <p className="text-xs text-gray-500">
              {product?.sellingStatus ? product.sellingStatus : '교환가능'}
            </p>
            <p className="text-mountain_meadow font-bold">{product?.price}p</p>
          </div>
        )
      })}

      {/* 바닥 감지 요소 */}
      <div ref={bottomRef} className="h-1 w-full"></div>
      <WarnNotLoggedIn
        isOpen={isWarnNotLoggedInDialogOpen}
        onOpenChange={setIsWarnNotLoggedInDialogOpen}
        content="포인트 상점"
      />
    </div>
  )
}

export default ProductList
