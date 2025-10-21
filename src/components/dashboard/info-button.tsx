import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../shadcn/tooltip'
import { Info as InfoOutlineIcon } from 'lucide-react'

interface InfoButtonProps {
  text: string
  className?: string
}
const InfoButton = ({ text, className }: InfoButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip onOpenChange={setShowTooltip} open={showTooltip}>
        <TooltipTrigger asChild className={className}>
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
