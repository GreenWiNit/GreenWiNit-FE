import { ChevronLeft } from 'lucide-react'
import AddressInput, { AddressState } from '../common/form/AddressInput'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import InputLabel from '../common/form/InputLabel'
import BottomNavigation from '../common/BottomNav'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface FormData {
  name: string
  phone: string
  address: AddressState
}

const EnrollAddress = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mode = searchParams.get('mode') || 'add'
  const isEditMode = mode === 'edit'

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: null,
  })

  useEffect(() => {
    if (isEditMode) {
      const savedUserInfo = localStorage.getItem('deliveryUserInfo')
      if (savedUserInfo) {
        const userInfo = JSON.parse(savedUserInfo)
        console.log(userInfo)
        setFormData({
          name: userInfo.name || '',
          phone: userInfo.phone || '',
          address: userInfo.address || null,
        })
      }
    }
  }, [isEditMode])

  const handleBackButtonClick = () => {
    navigate(-1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressChange = useCallback((address: AddressState) => {
    setFormData((prev) => ({
      ...prev,
      address,
    }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log(formData)
  }

  return (
    <div className="w-full bg-white">
      <div className="flex min-h-[50px] flex-shrink-0 flex-row items-center gap-30 p-[20px]">
        <ChevronLeft size={24} onClick={handleBackButtonClick} />
        <div className="text-xl text-black">{isEditMode ? '주소지 수정' : '주소지 추가'}</div>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="flex-1 p-[16px] text-start">
          <InputLabel required={true}>이름</InputLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputLabel required={true}>전화번호</InputLabel>
          <Input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <InputLabel required={true}>주소</InputLabel>
          <AddressInput value={formData.address} onChange={handleAddressChange} />
        </div>
        <div className="mt-70 mb-5 flex flex-shrink-0 justify-center p-4">
          <button
            type="submit"
            className="rounded-[8px] bg-green-600 px-[138px] py-[14px] text-white"
            onClick={handleSubmit}
          >
            저장하기
          </button>
        </div>
      </form>
      <BottomNavigation />
    </div>
  )
}

export default EnrollAddress
