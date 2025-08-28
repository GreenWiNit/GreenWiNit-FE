import dayjs from 'dayjs'
import { useState, useRef, useEffect } from 'react'
import TimeWheel from './time-wheel'

interface TimePickerProps {
  value: Date | null
  onChange: (value: Date | null) => void
}

/**
 * It's from https://preline.co/docs/time-picker.html#custom-design and modified
 * 휠 형태의 TimeInput 컴포넌트
 */
const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const propHours = value?.getHours()
  /** 0 ~ 11 */
  const [selectedHour, setSelectedHour] = useState(propHours == null ? 0 : propHours % 12)
  const [selectedMinute, setSelectedMinute] = useState(value?.getMinutes() ?? 0)
  const [selectedAMPM, setSelectedAMPM] = useState<'PM' | 'AM'>(
    propHours && propHours >= 12 ? 'PM' : 'AM',
  )
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onChange(
      dayjs(0)
        .hour(selectedAMPM === 'PM' ? selectedHour + 12 : selectedHour)
        .minute(selectedMinute)
        .toDate(),
    )
    // ignore onChange
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHour, selectedMinute, selectedAMPM])

  const handleWheel = (e: React.WheelEvent, type: 'hour' | 'minute' | 'ampm') => {
    if (type === 'hour') {
      const newHour = e.deltaY < 0 ? (selectedHour - 1 + 12) % 12 : (selectedHour + 1) % 12
      setSelectedHour(newHour)
    } else if (type === 'minute') {
      const newMinute = e.deltaY < 0 ? (selectedMinute - 1 + 60) % 60 : (selectedMinute + 1) % 60
      setSelectedMinute(newMinute)
    } else if (type === 'ampm') {
      setSelectedAMPM(selectedAMPM === 'AM' ? 'PM' : 'AM')
    }
  }

  const handleTouchChange = (type: 'hour' | 'minute' | 'ampm', direction: 'up' | 'down') => {
    if (type === 'hour') {
      setSelectedHour((selectedHour) => {
        const newHour = direction === 'up' ? (selectedHour + 1) % 12 : (selectedHour - 1 + 12) % 12
        return newHour
      })
    } else if (type === 'minute') {
      setSelectedMinute((selectedMinute) => {
        const newMinute =
          direction === 'up' ? (selectedMinute + 1) % 60 : (selectedMinute - 1 + 60) % 60
        return newMinute
      })
    } else if (type === 'ampm') {
      setSelectedAMPM(selectedAMPM === 'AM' ? 'PM' : 'AM')
    }
  }

  return (
    <div className="relative flex items-center justify-center" ref={ref}>
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="h-10 bg-gray-100"></div>
      </div>
      <TimeWheel
        items={hours}
        selectedValue={selectedHour}
        onWheel={(e) => handleWheel(e, 'hour')}
        onTouchChange={(direction: 'up' | 'down') => handleTouchChange('hour', direction)}
        onClickWheelItem={setSelectedHour}
        isHour
      />
      <TimeWheel
        items={minutes}
        selectedValue={selectedMinute}
        onWheel={(e) => handleWheel(e, 'minute')}
        onTouchChange={(direction: 'up' | 'down') => handleTouchChange('minute', direction)}
        padLeft
        onClickWheelItem={setSelectedMinute}
      />
      <TimeWheel
        items={ampm}
        selectedValue={selectedAMPM}
        onWheel={(e) => handleWheel(e, 'ampm')}
        onTouchChange={(direction: 'up' | 'down') => handleTouchChange('ampm', direction)}
        onClickWheelItem={setSelectedAMPM}
      />
    </div>
  )
}

const hours = Array.from({ length: 12 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)
const ampm = ['AM', 'PM'] as const

export default TimePicker
