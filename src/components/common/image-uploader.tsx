import { Loader2, Upload, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Button } from '../shadcn/button'
import { toast } from 'sonner'

interface ImageUploaderProps {
  value?: FileList | null
  onChange: (files: FileList | null) => void
  accept?: string
  capture?: boolean
  disabled?: boolean
  className?: string
}

const ImageUploader = ({
  value,
  onChange,
  accept = 'image/*',
  capture = true,
  disabled = false,
  className = '',
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const inputId = useId()

  useEffect(() => {
    if (!value || value.length === 0) {
      setImageUrl(null)
      return
    }

    const file = value[0]
    if (!file || !(file instanceof File) || !file.type.startsWith('image/')) {
      return
    }
    try {
      const url = URL.createObjectURL(file)
      setImageUrl(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '이미지 URL을 생성할 수 없습니다.'
      toast.error(errorMessage)
      setImageUrl(null)
      return
    }
  }, [value])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsUploading(true)

      const selectedFile = files[0]
      if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
        alert(`파일 크기는 5MB 이하여야 합니다.`)
        setIsUploading(false)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 500))

      onChange(files)
      setIsUploading(false)
    }
  }

  const handleFileRemove = () => {
    onChange(null)

    const fileInput = document.getElementById(inputId) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const hasFile = value && value.length > 0

  return (
    <div className={`${className} h-48 w-full`}>
      {hasFile ? (
        <div className="relative h-full rounded-md">
          {imageUrl && (
            <div className="h-full w-full">
              <img
                src={imageUrl}
                alt="업로드된 이미지 미리보기"
                className="object-fit h-full w-full rounded-md border border-gray-200"
              />
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleFileRemove}
            disabled={disabled}
            className="absolute top-0 right-0"
          >
            <X className="text-gray-500" size={16} />
          </Button>
        </div>
      ) : (
        <div className="relative h-full">
          <input
            id={inputId}
            type="file"
            accept={accept}
            capture={capture ? 'environment' : undefined}
            onChange={handleFileChange}
            disabled={isUploading || disabled}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
          <div
            className={`flex h-36 cursor-pointer touch-manipulation flex-col items-center justify-center rounded-md border-2 border-dashed transition-all ${
              isUploading
                ? 'border-mountain_meadow-300 bg-blue-50'
                : disabled
                  ? 'cursor-not-allowed border-gray-200 bg-gray-50'
                  : 'border-gray-300 active:border-gray-400'
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 className="text-mountain_meadow-500 mb-3 h-10 w-10 animate-spin" />
                <p className="text-mountain_meadow-500 px-4 text-center text-sm">업로드 중...</p>
              </>
            ) : (
              <>
                <Upload
                  className={`mb-3 h-10 w-10 ${disabled ? 'text-gray-300' : 'text-gray-400'}`}
                />
                <p
                  className={`px-4 text-center text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  사진을 업로드해주세요.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
