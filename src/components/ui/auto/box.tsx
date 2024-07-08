import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

export { Block, Flex, Grid }

/* Template
  export const name = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => (
      <div ref={ref} {...rest} className={cn('', className)}></div>
    )
  )
 */

// Display元素 增加一点 DOM 可读性感觉是个不错的做法.
const Block = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={cn('block', className)}></div>
  )
)
const Flex = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={cn('flex', className)}></div>
  )
)
const Grid = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={cn('grid', className)}></div>
  )
)

// 这部分代码是为了定义 ⁠Grid 组件的显示名称。当在开发者工具或者错误日志中查看组件时，显示名称可以帮助开发者更容易地识别组件。在这里，将 ⁠Grid 组件的 ⁠displayName 属性设置为 ‘Grid’，以便在开发者工具中显示时能够清晰地表明该组件的名称。
Block.displayName = 'Block'
Flex.displayName = 'Flex'
Grid.displayName = 'Grid'
