import { VariantProps, cva } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

const myButtonVariants = cva(
  cn(
    'flex justify-center items-center',
    'rounded-[40px]',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ),
  {
    variants: {
      variant: {
        primary: cn('text-white', 'bg-[#E91898]'),
        outline: cn(
          'text-[#E91898]',
          'bg-transparent',
          'border border-[#E91898]'
        ),
        disabled: cn(
          'text-white text-opacity-70',
          'bg-transparent',
          'border border-white border-opactiy-70'
        )
      },
      size: {
        pc: cn('text-[20px]', 'gap-2', 'px-[52px]', 'h-[60px]'),
        mobile: cn('text-[16px]', 'gap-1', 'px-[42px]', 'h-[40px]')
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'pc'
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof myButtonVariants> {
  directlyUsingChildrenSlot?: boolean
  suffixSlot?: ReactNode
  buttonStatus?: ButtonSlotStatus
}

type ButtonSlotStatus = 'default' | 'forward' | 'loading'

const LoadingSlot = (
  <div className="i-lucide-loader text-[24px] animate-spin " />
)

const ForwardSlot = <div className="i-lucide-chevron-right text-[24px]" />

const whichStatus = (type: ButtonSlotStatus) => {
  switch (type) {
    case 'default':
      return
    case 'forward':
      return ForwardSlot
    case 'loading':
      return LoadingSlot
  }
}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      directlyUsingChildrenSlot = false,
      suffixSlot,
      buttonStatus = 'default',
      children,
      ...props
    },
    ref
  ) => {
    const Tag = directlyUsingChildrenSlot ? Slot : 'button'
    return (
      <Tag
        ref={ref}
        className={cn(myButtonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
        {suffixSlot ?? whichStatus(buttonStatus)}
      </Tag>
    )
  }
)
MyButton.displayName = 'MyButton'

export { MyButton, myButtonVariants }
