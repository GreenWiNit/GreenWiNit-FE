import ReactDatePickerLib, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { ko } from 'date-fns/locale/ko'
import Input from './Input'
import { ComponentProps } from 'react'
import { CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'

registerLocale('ko', ko)
setDefaultLocale('ko')

type DatePickerSingleProps = ComponentProps<typeof ReactDatePickerLib> & {
  customInput?: never
  icon?: never
  showIcon?: never
  toggleCalendarOnIconClick?: never
  dateFormat?: never
  dateFormatCalendar?: never
}
const DatePickerSingle = (props: DatePickerSingleProps) => {
  return (
    <ReactDatePickerLib
      placeholderText="YYYY-MM-DD"
      dateFormat="yyyy-MM-dd"
      {...props}
      customInput={<Input className="!px-4 !py-3 !pl-[40px]" />}
      icon={<CalendarDays className="top-[8px] left-[8px] cursor-pointer" />}
      showIcon
      toggleCalendarOnIconClick
      wrapperClassName={cn('w-full', props.wrapperClassName)}
      dateFormatCalendar="yyyy년 M월"
    />
  )
}

export default DatePickerSingle
