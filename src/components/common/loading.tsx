import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const GradientSpinner = ({ className, size = 'md' }: SpinnerProps) => {
  return (
    <div
      className={cn(sizeClasses[size], 'animate-spin rounded-full', className)}
      style={{
        background: 'conic-gradient(from 0deg, transparent, #48bb78)',
        WebkitMask:
          'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px))',
        mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px))',
      }}
    />
  )
}

function Loading({ className = '', size = 'md' }: SpinnerProps) {
  return (
    <div className="cn-loading flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      <GradientSpinner className={className} size={size} />
      <p className="font-bold">로딩 중...</p>
    </div>
  )
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
}

export default Loading
