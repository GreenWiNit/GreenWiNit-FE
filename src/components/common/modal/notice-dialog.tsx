import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/common/modal/dialog'
import { Button } from '@/components/common/button'
import React from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { cn } from '@/lib/utils'

interface NoticeDialogProps {
  /** 모달 열림 여부 true면 다이얼로그가 열리고 false면 닫힘 */
  isOpen: boolean
  /** 모달 상단에 표시되는 제목 (선택사항) */
  title?: string | React.ReactNode
  /** 모달 본문에 표시될 설명 또는 React 노드 */
  description: string | React.ReactNode
  /** description 아래쪽에 작게 표시할 추가 문장 */
  paragraph?: string
  /** 모달 열림/닫힘 상태를 제어하기 위한 setter */
  setIsOpen: (open: boolean) => void
  /** 확인 버튼 클릭 시 실행되는 콜백 함수 */
  onConfirm: () => void
  /** 모달 레이아웃 커스터마이징용 className */
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
        {title ? (
          <DialogTitle className="flex items-center justify-center text-center text-lg leading-3 font-semibold whitespace-pre-line text-black">
            {title}
          </DialogTitle>
        ) : (
          <DialogTitle className="flex items-center justify-center text-center text-lg leading-3 font-semibold whitespace-pre-line text-black">
            <VisuallyHidden>Notice</VisuallyHidden>
          </DialogTitle>
        )}
        <DialogDescription
          asChild
          className="text-secondary-foreground flex flex-col items-center justify-center text-center text-base whitespace-pre-line"
        >
          <div>
            {description}
            {paragraph && <p className="text-lighter-gray text-xs">{paragraph}</p>}
          </div>
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
