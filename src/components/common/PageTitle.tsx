import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const pageTitleVariants = cva('!text-2xl font-bold', {
  variants: {},
  defaultVariants: {},
})

type PageTitleProps = VariantProps<typeof pageTitleVariants> &
  React.HTMLAttributes<HTMLHeadingElement>

const PageTitle = ({ className, ...props }: PageTitleProps) => {
  return <h1 {...props} className={cn(pageTitleVariants(className), className)}></h1>
}

export default PageTitle
