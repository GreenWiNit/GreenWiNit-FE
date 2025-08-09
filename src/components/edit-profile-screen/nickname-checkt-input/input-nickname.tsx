import { usersApi } from '@/api/users'
import Required from '@/components/common/required'
import { ComponentPropsWithRef, forwardRef, useId } from 'react'
import { toast } from 'sonner'

type InputNicknameProps = {
  mode?: 'new' | 'edit'
  setIsNicknameDuplicated: (isChecked: boolean) => void
} & ComponentPropsWithRef<'input'>

const InputNickname = forwardRef<HTMLInputElement, InputNicknameProps>(
  ({ mode = 'new', setIsNicknameDuplicated, ...props }, ref) => {
    const id = useId()

    const labelContent =
      mode === 'edit' ? (
        '변경할 닉네임'
      ) : (
        <>
          닉네임
          <Required />
        </>
      )

    const handleClick = async () => {
      const nickname = props.value as string

      if (!nickname) {
        toast.error('닉네임을 입력해 주세요.')
        return
      }

      const res = await usersApi.checkNicknameDuplicate(nickname)

      if ('nickname' in res && res.available) {
        setIsNicknameDuplicated(true)
        toast.success('사용 가능한 닉네임입니다.')
      } else {
        setIsNicknameDuplicated(false)
        toast.error('중복된 닉네임이 존재합니다.')
      }
    }

    return (
      <fieldset>
        <legend className="sr-only">{labelContent}</legend>
        <label htmlFor={id} className="text-secondary-foreground block text-start text-sm">
          {labelContent}
        </label>
        <div className="focus-within:border-mountain_meadow mt-2 flex w-full justify-between overflow-hidden rounded-md border border-gray-300 bg-white">
          <input
            ref={ref}
            id={id}
            type="text"
            placeholder={mode === 'new' ? '새 닉네임을 입력해주세요.' : '닉네임 입력'}
            className="flex-1 px-3 py-4 text-sm focus:outline-none"
            {...props}
          />
          <button
            type="button"
            onClick={handleClick}
            className="hover:bg-mountain_meadow rounded-r-md bg-gray-300 px-8 text-sm text-white"
          >
            중복 확인
          </button>
        </div>
        <span className="text-lighter-gray mt-2 block text-start text-xs">
          2~20자 이내, 특수문자 사용 불가
        </span>
      </fieldset>
    )
  },
)

InputNickname.displayName = 'InputNickname'
export default InputNickname
