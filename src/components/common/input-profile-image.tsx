import React, { ComponentProps, useState } from 'react'
import LogoIcon from '@/components/common/logo-icon'
import { cn } from '@/lib/utils'
import InputImage from './form/input-image'

interface InputProfileImageProps
  extends Omit<ComponentProps<'input'>, 'src' | 'value' | 'onChange'> {
  value: string | null
  onChange: (src: string | null) => void
}

function InputProfileImage({
  value: prevSource,
  onChange: onChange,
  ...restProps
}: InputProfileImageProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const source = prevSource ?? null
  const [preview, setPreview] = useState<string | null>(source)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative flex w-fit items-center justify-center rounded-full bg-white shadow-md"
    >
      <div className="h-[92px] w-[92px] overflow-hidden rounded-full">
        {!preview ? (
          <LogoIcon size="large" className="cursor-pointer" />
        ) : (
          <img src={preview} alt="프로필 이미지" className="h-full w-full object-scale-down" />
        )}
      </div>
      <img
        src="/icons/camera.svg"
        alt="사진 업로드"
        width={24}
        height={24}
        className="absolute right-0 bottom-0"
      />
      <InputImage
        ref={fileInputRef}
        purpose="profile"
        localFileName={source}
        onChange={onChange}
        onChangePreview={setPreview}
        {...restProps}
        className={cn('hidden', restProps.className)}
      />
    </button>
  )
}

export default InputProfileImage
