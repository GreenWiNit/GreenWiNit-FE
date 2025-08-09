import React, { ComponentProps, forwardRef } from 'react'
import { imagesApi } from '@/api/images'
import { toast } from 'sonner'
import { omit } from 'es-toolkit'
import { cn } from '@/lib/utils'

interface InputProfileImageProps
  extends Omit<ComponentProps<'input'>, 'src' | 'value' | 'onChange'> {
  localFileName: string | null
  onChange: (src: string | null) => void
  onChangePreview?: (src: string) => void
  purpose: Parameters<typeof imagesApi.uploadImage>[0]
}

function InputImageImpl(
  { onChange: onChange, onChangePreview, purpose, ...restProps }: InputProfileImageProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const processingObjectURL = URL.createObjectURL(file)
      onChangePreview?.(processingObjectURL)
      imagesApi.uploadImage(purpose, file).then((res) => {
        URL.revokeObjectURL(processingObjectURL)
        if (!res.success) {
          toast.error(res.message)
          return
        }
        onChange(res.result)
        if (e.target) e.target.value = ''
      })
    }
  }

  return (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      {...omit(restProps, ['localFileName'])}
      className={cn(restProps.className, 'cursor-pointer')}
    />
  )
}

const InputImage = forwardRef<HTMLInputElement, InputProfileImageProps>(InputImageImpl)

InputImage.displayName = 'InputImage'
export default InputImage
