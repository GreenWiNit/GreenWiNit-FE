import React, { ComponentProps } from 'react'
import { imagesApi } from '@/api/images'
import { toast } from 'sonner'
import { omit } from 'es-toolkit'
import { cn } from '@/lib/utils'

interface InputImageProps extends Omit<ComponentProps<'input'>, 'src' | 'value' | 'onChange'> {
  localFileName: string | null
  onChange: (src: string | null) => void
  onChangePreview?: (src: string) => void
  purpose: Parameters<typeof imagesApi.uploadImage>[0]
}

function InputImage({
  onChange: onChange,
  onChangePreview,
  purpose,
  ...restProps
}: InputImageProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const processingObjectURL = URL.createObjectURL(file)
      onChangePreview?.(processingObjectURL)
      imagesApi.uploadImage(purpose, file).then((res) => {
        URL.revokeObjectURL(processingObjectURL)
        if (!res) return // void 방어
        if (!res.success) {
          toast.error(res.message)
          return
        }
        onChange(res.result)
      })
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      capture="environment" // 모바일에서 카메라 촬영 옵션 노출을 위해 추가
      onChange={handleFileChange}
      {...omit(restProps, ['localFileName'])}
      className={cn(restProps.className, 'cursor-pointer')}
    />
  )
}

export default InputImage
