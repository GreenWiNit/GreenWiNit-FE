import { Message, MultipleFieldErrors } from 'react-hook-form'
import { ErrorMessage as OriginalErrorMessage } from '@hookform/error-message'
import { ComponentProps } from 'react'

const RenderMessage = (data: { message: Message; messages?: MultipleFieldErrors }) => {
  return <p className="self-start p-2 text-red-500">{data.message}</p>
}

const ErrorMessage = (props: ComponentProps<typeof OriginalErrorMessage>) => {
  return <OriginalErrorMessage {...props} render={RenderMessage} />
}

export default ErrorMessage
