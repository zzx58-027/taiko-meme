export const StyledTabHeader: FC<{
  iconMeta?: string
  headerTitle?: string
  className?: string
  children?: ReactNode
}> = ({
  iconMeta,
  headerTitle,
  className,
  children = <div className="i-lucide-more-vertical hover:cursor-pointer" />
}) => {
  return (
    <Flex className={cn(className)}>
      <div
        className={cn(
          'grid place-content-center',
          'size-6 rounded-full p-5',
          'bg-white bg-opacity-20',
          'mr-2'
        )}
      >
        <div className={iconMeta} />
      </div>
      <Font_Montserrat>{headerTitle}</Font_Montserrat>
      <Flex className="basis-full justify-end">{children}</Flex>
    </Flex>
  )
}

export const StyledDisplayKVPair: FC<
  {
    className?: string
    keyItemClassName?: string
    valueItemClassName?: string
    keyTitle?: ReactNode
    keyItemSlot?: ReactNode
    valueItemSlot?: ReactNode
    directlyUsingChild?: boolean
    wrapWithTag?: keyof JSX.IntrinsicElements
  } & PropsWithChildren
> = ({
  children,
  className = 'font-semibold',
  keyItemClassName,
  valueItemClassName,
  keyTitle,
  keyItemSlot,
  valueItemSlot,
  directlyUsingChild = false,
  wrapWithTag: Tag = 'p'
}) => {
  return (
    <Flex className={cn('justify-between items-center', className)}>
      {keyItemSlot ?? (
        <Font_Montserrat className={cn('opacity-70', keyItemClassName)}>
          {keyTitle}
        </Font_Montserrat>
      )}
      {valueItemSlot ?? directlyUsingChild ? (
        children
      ) : (
        <Tag className={cn(valueItemClassName)}>{children}</Tag>
      )}
    </Flex>
  )
}
