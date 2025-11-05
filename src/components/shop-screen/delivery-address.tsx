import useAddress from '@/hooks/use-adress'
import { Plus } from 'lucide-react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Fragment } from 'react'
import { Button } from '@/components/common/button'

interface DeliveryAddressProps {
  pointProductId?: string | undefined
}

const DeliveryAddress = ({ pointProductId: propPointProductId }: DeliveryAddressProps = {}) => {
  const navigate = useNavigate()
  const params = useParams({ from: '/point-shop/products/$point-product-id/detail' })

  const pointProductId = propPointProductId || params['point-product-id']

  const { data: userAddressData } = useAddress()

  const hasAddress = Boolean(userAddressData)

  const handleAddressClick = () => {
    if (!pointProductId) {
      console.error('pointProductId가 없습니다.')
      return
    }

    if (hasAddress) {
      navigate({
        to: '/point-shop/products/$point-product-id/enroll-address',
        params: { 'point-product-id': pointProductId },
        search: { mode: 'edit' },
      })
    } else {
      navigate({
        to: '/point-shop/products/$point-product-id/enroll-address',
        params: { 'point-product-id': pointProductId },
        search: { mode: 'add' },
      })
    }
  }

  return (
    <Fragment>
      <div className="pt-4 text-xl font-bold">배송지 정보</div>
      {hasAddress ? (
        <div className="text-md m-4 flex flex-col rounded-lg border p-4 text-start md:text-base">
          <div className="flex flex-row justify-between">
            <div>
              <span className="font-bold">이름: </span>
              <span>{userAddressData?.name}</span>
            </div>
            <Button className="max-h-10 min-w-18" onClick={handleAddressClick}>
              수정
            </Button>
          </div>
          <div>
            <span className="font-bold">전화번호: </span>
            <span>{userAddressData?.phone}</span>
          </div>
          <div>
            <span className="font-bold">주소: </span>
            <span>
              {userAddressData && userAddressData.address
                ? `${userAddressData.address.roadAddress} ${userAddressData.address.detailAddress}`
                : null}
            </span>
          </div>
        </div>
      ) : (
        <div className="m-4 flex flex-col rounded-lg border p-8">
          <div className="pb-4 text-base md:text-lg">배송지를 먼저 등록해주세요</div>
          <Button
            onClick={handleAddressClick}
            className="flex w-fit flex-row items-center justify-center self-center px-6 py-2"
          >
            <Plus size={20} />
            <span>등록하기</span>
          </Button>
        </div>
      )}
    </Fragment>
  )
}

export default DeliveryAddress
