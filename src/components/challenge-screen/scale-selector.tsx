import { SurveyStepConfig } from '@/types/servey'

interface ScaleSelectorProps {
  stepConfig: SurveyStepConfig
  selectedNumber: number[]
  onSelectionChange: (number: number) => void
}

const ScaleSelector = ({ stepConfig, selectedNumber, onSelectionChange }: ScaleSelectorProps) => {
  if (stepConfig.type !== 'scale') {
    return null
  }

  const { scaleConfig } = stepConfig
  const min = scaleConfig?.min ?? 1
  const max = scaleConfig?.max ?? 10
  const step = scaleConfig?.step ?? 1
  const selectedValue = selectedNumber[0] || null

  const scaleNumbers = Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, i) => min + i * step,
  )

  return (
    <div className="mt-10 mb-20 flex w-full flex-col gap-6">
      <div className="flex justify-center">
        {scaleNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onSelectionChange(number)}
            className={`h-10 w-10 border-2 font-semibold transition-all ${
              selectedValue === number
                ? 'bg-mountain_meadow-500 border-mountain_meadow-500 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
            } `}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ScaleSelector
