import useProducts from '@/hooks/product/use-products'
import { CircleAlert } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import Loading from '../common/loading'
import useIsLoggedIn from '@/hooks/use-is-logged-in'
import { useState } from 'react'
import WarnNotLoggedIn from '../common/warn-not-logged-in'

const ProductList = () => {
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

  const { data: products, isLoading } = useProducts()

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
    <div className="grid grid-cols-2 self-center">
      {products?.map((product) => {
        return (
          <div
            key={product?.id}
            className="cursor-pointer items-center justify-center rounded-md p-2 text-start"
            onClick={() => handleProductClick(product?.id)}
          >
            <div className="mb-2 h-36 w-36 items-center justify-center rounded-md bg-white">
              <img
                className="h-full w-full items-center justify-center rounded-lg"
                src={product?.thumbnailUrl}
                alt={product?.name}
              />
            </div>
            <p className="text-sm font-bold whitespace-nowrap text-black">{product?.name}</p>
            <p className="text-xs text-gray-500">{product?.sellingStatus}</p>
            <p className="text-mountain_meadow font-bold">{product?.price}p</p>
          </div>
        )
      })}
      <WarnNotLoggedIn
        isOpen={isWarnNotLoggedInDialogOpen}
        onOpenChange={setIsWarnNotLoggedInDialogOpen}
        content="포인트 상점"
      />
    </div>
  )
}

export default ProductList
