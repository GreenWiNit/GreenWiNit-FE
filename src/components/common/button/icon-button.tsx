import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button as ShadcnButton } from '@/components/shadcn/button'
import { cva, type VariantProps } from 'class-variance-authority'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'bg-white hover:bg-mountain_meadow/80 color-mountain_meadow',
        disabled: 'bg-disabled !cursor-not-allowed',
        outline: 'border-mountain_meadow border bg-white hover:bg-gray-50',
        ghost: 'bg-transparent hover:bg-gray-100',
      },
      size: {
        default: 'size-10',
        sm: 'size-8',
        lg: 'size-12',
      },
      iconSize: {
        default: '[&_svg]:size-5',
        sm: '[&_svg]:size-4',
        lg: '[&_svg]:size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      iconSize: 'default',
    },
  },
)

function IconButton({
  className,
  variant,
  size,
  iconSize,
  icon: Icon,
  ...props
}: Omit<React.ComponentProps<'button'>, 'children'> &
  VariantProps<typeof iconButtonVariants> & {
    icon: LucideIcon
    asChild?: boolean
  }) {
  return (
    <ShadcnButton
      data-slot="icon-button"
      className={cn(iconButtonVariants({ variant, size, iconSize, className }))}
      {...props}
      disabled={props.disabled || variant === 'disabled'}
    >
      <Icon />
    </ShadcnButton>
  )
}

export { IconButton }
