import { Plus as PlusIcon } from 'lucide-react'
import { Fragment, useRef, useState } from 'react'
import { omit } from 'es-toolkit'
import { cn, mergeRefs } from '@/lib/utils'
import InputImage from './input-image'

type InputUploadImageProps = Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> & {
  value: string | null
  purpose: Parameters<typeof InputImage>[0]['purpose']
  onChange: (src: string | null) => void
}

const InputUploadImage = (props: InputUploadImageProps) => {
  const source = props.value
  const [preview, setPreview] = useState<string | null>(source)
  const inputRef = useRef<HTMLInputElement>(
    props.ref && typeof props.ref === 'object' && 'current' in props.ref ? props.ref.current : null,
  )
  const mergedRef = mergeRefs(props.ref, inputRef)
  const hasRemoteImage = source?.startsWith('http://') || source?.startsWith('https://')

  return (
    <div
      className={cn(
        'flex min-h-[15vh] w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl',
        preview == null ? 'bg-[#f0f0f0] p-8' : 'max-h-[20vh]',
      )}
      onClick={() => inputRef.current?.click()}
    >
      {hasRemoteImage && source ? (
        <img src={source} alt="uploaded" className="min-h-[15vh]" />
      ) : !preview ? (
        <Fragment>
          <div className="rounded-full border-[2px] border-[#3A9B6E] p-2">
            <PlusIcon className="text-[#3A9B6E]" />
          </div>
          <span className="font-bold text-[#666666]">이미지를 업로드 해주세요.</span>
          <span className="text-sm text-[#999999]">권장 크기: 1200 x 800px</span>
        </Fragment>
      ) : (
        <img src={preview} alt="preview" className="min-h-[15vh]" />
      )}
      <InputImage
        {...omit(props, ['value'])}
        localFileName={
          source &&
          (source?.startsWith('file://') || source?.startsWith('blob:') || source?.startsWith('/'))
            ? source
            : null
        }
        onChangePreview={setPreview}
        onChange={props.onChange}
        purpose={props.purpose}
        ref={mergedRef}
        className={cn(hasRemoteImage && source && 'hidden', props.className)}
      />
    </div>
  )
}

export default InputUploadImage
