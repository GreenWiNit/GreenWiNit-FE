import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const pageContainerVariants = cva('flex h-full w-full flex-col bg-card', {
  variants: {},
  defaultVariants: {},
})

type PageContainerProps = VariantProps<typeof pageContainerVariants> &
  React.HTMLAttributes<HTMLDivElement>

const PageContainer = ({ className, ...props }: PageContainerProps) => {
  return <div {...props} className={cn(pageContainerVariants(className), className)}></div>
}

export default PageContainer
