import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const logoIconVariants = cva(
  'h-[92px] w-[92px] rounded-full border-2 border-gray-300 bg-[url("/img/logo-icon.png")] bg-cover bg-size-[50px] bg-no-repeat [background-position-x:center] [background-position-y:center]',
  {
    variants: {
      size: {
        small: 'h-[20px] w-[20px]',
        medium: 'h-[46px] w-[46px]',
        large: 'h-[92px] w-[92px]',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
)

type LogoIconProps = VariantProps<typeof logoIconVariants> & React.HTMLAttributes<HTMLDivElement>

const LogoIcon = ({ className, size, ...props }: LogoIconProps) => {
  return <div className={cn(logoIconVariants({ size }), className)} {...props} />
}

export default LogoIcon
