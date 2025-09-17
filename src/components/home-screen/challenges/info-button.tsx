import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/shadcn/tooltip'
import { Info as InfoOutlineIcon } from 'lucide-react'
import { InfoButtonProps } from './type'
import { useState } from 'react'

const InfoButton = ({ text }: InfoButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip onOpenChange={setShowTooltip} open={showTooltip}>
        <TooltipTrigger asChild>
          <InfoOutlineIcon
            className="text-mountain_meadow size-6"
            onClick={() => setShowTooltip((prev) => !prev)}
          />
        </TooltipTrigger>
        <TooltipContent className="p-4 shadow-xl">
          <p className="text-center whitespace-pre-line">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default InfoButton
