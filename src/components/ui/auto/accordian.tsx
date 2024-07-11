export const Accordian: FC<{
  accordianId: string | number
  useLogicControll?: boolean
  openByDefault?: boolean
  accordianWrapperClassName?: string
  accordianContentClassName?: string
  accordianTitleClassName?: string
  children?: ReactNode
  titleSlot?: ReactNode
  // onChange & onClick 是向外暴露状态, 还需要受控状态控制渠道.
  onChange?: () => void
  onClick?: () => void
}> = ({
  //  & React.HTMLAttributes<HTMLDivElement>
  accordianId,
  useLogicControll = undefined,
  onChange,
  onClick,
  openByDefault = true,
  titleSlot,
  accordianTitleClassName = cn('hover:cursor-pointer'),
  // 'peer-checked:rounded-b-[0px] rounded-b-[20px]',
  // 'peer-checked:after:rotate-0 ',
  // 'duration-500'
  accordianWrapperClassName,
  accordianContentClassName = cn('duration-300'),
  children
}) => {
  const accordianIdStr = `accordianItem-${accordianId}`
  return (
    <div className={cn(accordianWrapperClassName)}>
      <input
        type="checkbox"
        onClick={onClick}
        onChange={onChange}
        checked={useLogicControll}
        className={cn('peer', 'hidden')}
        defaultChecked={openByDefault}
        id={accordianIdStr}
      />
      <label htmlFor={accordianIdStr} className={cn(accordianTitleClassName)}>
        {titleSlot}
      </label>
      <section
        className={cn(
          'overflow-hidden',
          'grid grid-rows-[0fr] peer-checked:grid-rows-[1fr]',
          accordianContentClassName
        )}
      >
        {/* Is this div el indispensable? Yes, it is. */}
        <div className={cn('min-h-0')}>{children}</div>
      </section>
    </div>
  )
}
