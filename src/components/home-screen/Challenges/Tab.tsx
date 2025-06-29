import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { TabProps } from './type'

const Tab = ({ tab, setTab }: TabProps) => {
  return (
    <div className="mt-4 flex w-full flex-row">
      <TabItem isActive={tab === 'individual'} onClick={() => setTab('individual')}>
        개인
      </TabItem>
      <TabItem isActive={tab === 'team'} onClick={() => setTab('team')}>
        팀
      </TabItem>
    </div>
  )
}

const tabItemVariants = cva('h-full w-full p-2 font-bold border-transparent border-[2px]', {
  variants: {
    isActive: {
      true: ' border-b-mountain_meadow border-b-[2px] text-mountain_meadow',
      false: 'text-gray-500',
    },
  },
  defaultVariants: {
    isActive: false,
  },
})

type TabItemProps = VariantProps<typeof tabItemVariants> & React.HTMLAttributes<HTMLButtonElement>

const TabItem = ({ className, isActive, ...props }: TabItemProps) => {
  return (
    <button {...props} className={cn(tabItemVariants({ isActive }), className)}>
      {props.children}
    </button>
  )
}

export default Tab
