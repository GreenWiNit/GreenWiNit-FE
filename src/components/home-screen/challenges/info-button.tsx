import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/shadcn/tooltip'
import { Info as InfoOutlineIcon } from 'lucide-react'
import { InfoButtonProps } from './type'

const InfoButton = ({ onOpenChange, isOpen, onClick, text }: InfoButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip onOpenChange={onOpenChange} open={isOpen}>
        <TooltipTrigger asChild>
          <InfoOutlineIcon className="text-mountain_meadow" onClick={onClick} />
        </TooltipTrigger>
        <TooltipContent className="p-4 shadow-xl">
          <p className="text-center whitespace-pre-line">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default InfoButton
