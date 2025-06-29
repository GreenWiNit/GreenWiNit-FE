import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const pageHeaderSectionVariants = cva(
  'bg-white relative flex flex-row items-center justify-center h-12 border-b border-b-[F0F0F0]',
  {
    variants: {},
    defaultVariants: {},
  },
)

type PageHeaderSectionProps = VariantProps<typeof pageHeaderSectionVariants> &
  React.HTMLAttributes<HTMLDivElement>

const PageHeaderSection = ({ className, ...props }: PageHeaderSectionProps) => {
  return <div {...props} className={cn(pageHeaderSectionVariants(className), className)}></div>
}

export default PageHeaderSection
