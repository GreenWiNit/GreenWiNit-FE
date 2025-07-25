import { Input as ShadcnInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'

const inputVariants = cva('h-auto min-h-[1lh] py-3 px-4', {
  variants: {},
  defaultVariants: {},
})

type InputProps = VariantProps<typeof inputVariants> & ComponentProps<'input'>

const Input = ({ className, ...props }: InputProps) => {
  return <ShadcnInput className={cn(inputVariants({ className }))} {...props} />
}

export default Input
