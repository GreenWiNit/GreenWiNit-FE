import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/common/modal/dialog'
import { Button } from '@/components/common/button'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { cn } from '@/lib/utils'

type ConfirmDialogProps = {
  /** 모달의 열림 상태 */
  isOpen: boolean
  /** 모달 제목 */
  title?: string
  /** 모달 본문에 표시될 설명 또는 React 노드 */
  description: string | React.ReactNode
  /** 설명 아래에 표시할 보조 문단 */
  paragraph?: string
  /** 모달 열림/닫힘 상태를 제어하기 위한 setter */
  setIsOpen: (open: boolean) => void
  /** 확인 버튼 클릭 시 실행되는 콜백 함수 */
  onConfirm: () => void
  /** 확인 버튼 클릭 시 비동기 처리 중 상태 */
  isPending?: boolean
  /** 모달 스타일 커스터마이징용 className */
  className?: string
}

function ConfirmDialog({
  isOpen,
  title,
  description,
  paragraph,
  setIsOpen,
  onConfirm,
  isPending,
  className,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn('gap-6 p-8', className)} showCloseButton={false}>
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
          className="text-secondary-foreground text-center text-base whitespace-pre-wrap"
        >
          <div>
            {description}
            {paragraph && <p className="text-lighter-gray text-xs">{paragraph}</p>}
          </div>
        </DialogDescription>
        <DialogFooter className="flex flex-row items-center gap-4 sm:justify-center">
          <Button
            size="flex"
            variant="cancel"
            onClick={() => setIsOpen(false)}
            className="h-10 px-4 py-2.5"
          >
            취소
          </Button>
          <Button size="flex" onClick={onConfirm} disabled={isPending} className="h-10 px-4 py-2.5">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
