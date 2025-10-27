import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/common/modal/dialog'
import { Button } from '@/components/common/button'
import React from 'react'
import { cn } from '@/lib/utils'

interface NoticeDialogProps {
  isOpen: boolean
  title?: string
  description: string | React.ReactNode
  paragraph?: string
  setIsOpen: (open: boolean) => void
  onConfirm: () => void
  className?: string
}

function NoticeDialog({
  isOpen,
  title,
  description,
  paragraph,
  setIsOpen,
  onConfirm,
  className,
}: NoticeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn('gap-6 p-10', className)} showCloseButton={false}>
        {title && (
          <DialogTitle className="flex items-center justify-center text-center text-lg leading-3 font-semibold whitespace-pre-line text-black">
            {title}
          </DialogTitle>
        )}
        <DialogDescription className="text-secondary-foreground flex flex-col items-center justify-center text-center text-base whitespace-pre-line">
          {description}
          {paragraph && <p className="text-lighter-gray text-xs">{paragraph}</p>}
        </DialogDescription>
        <DialogFooter className="flex flex-row items-center gap-4 sm:justify-center">
          <Button size="flex" onClick={onConfirm} className="mx-16 h-10 px-4 py-2.5">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NoticeDialog
