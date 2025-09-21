import { SurveyStepConfig } from '@/types/servey'
import { JSX, useState } from 'react'
import ScaleSelector from './scale-selector'

export const SurveyStep: React.FC<SurveyStepProps> = ({ stepConfig, data, onUpdate }) => {
  const [selectedData, setSelectedData] = useState<(number | string)[]>(data || [])

  const handleSingleChange = (value: number | string): void => {
    const updatedData = [value]
    setSelectedData(updatedData)
    onUpdate(updatedData)
  }

  const renderQuestion = (): JSX.Element | null => {
    switch (stepConfig.type) {
      case 'checkbox':
        return (
          <div className="flex flex-col gap-4">
            {stepConfig.options?.map((option) => (
              <label key={option.id} className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedData.includes(option.id)}
                  onChange={() => handleSingleChange(option.id)}
                  className="mt-1 h-4 w-4 text-green-500"
                />
                <span className="text-sm leading-relaxed text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        )

      case 'radio':
        return (
          <div className="flex flex-col gap-4">
            {stepConfig.options?.map((option) => (
              <label key={option.id} className="flex cursor-pointer items-start gap-3">
                <input
                  type="radio"
                  name={stepConfig.id}
                  checked={selectedData.includes(option.id)}
                  onChange={() => handleSingleChange(option.id)}
                  className="mt-1 h-4 w-4 text-green-500"
                />
                <span className="text-sm leading-relaxed text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        )

      case 'scale':
        return (
          <ScaleSelector
            stepConfig={stepConfig}
            selectedNumber={selectedData.map(Number)}
            onSelectionChange={handleSingleChange}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="text-center">
        <p className="font-bold whitespace-pre-line">{stepConfig.question}</p>
      </div>
      {renderQuestion()}
    </div>
  )
}

interface SurveyStepProps {
  stepConfig: SurveyStepConfig
  data: (number | string)[]
  onUpdate: (data: (number | string)[]) => void
}

export default SurveyStep
