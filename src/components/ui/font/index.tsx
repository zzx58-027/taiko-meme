// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
import { Slot } from '@radix-ui/react-slot'
import {
  Mochiy_Pop_One,
  Covered_By_Your_Grace,
  Montserrat
} from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
})
const mochiy_pop_one = Mochiy_Pop_One({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-mochiy-pop-p-one'
})
const covered_by_your_grace = Covered_By_Your_Grace({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-covered-by-your-grace'
})

interface FontComp_CustomProps {
  usePropChildren?: boolean
  // JSX.IntrinsicAttributes 是 TypeScript 中用于描述 JSX 元素属性的类型。它包含一组内置属性，用于表示任何 JSX 元素可能具有的属性。这些属性包括 key 和 ref，它们在 JSX 中使用常见且重要。
  // JSX.IntrinsicElements 是 TypeScript 中用于描述 JSX 元素标签的类型。它包含了所有原生 HTML 元素（如 div、span、input 等），以及它们的属性，用于表示 JSX 中可能使用的元素和它们支持的属性。
  wrapWithTag?: keyof JSX.IntrinsicElements
}

// 有点手痒想弄工厂函数...不过代码压缩应该会代处理这些重复代码?
// React.forwardRef 的函数签名: forwardRef<HTMLButtonElement, Props>. 可以查看 IDE 函数提示的 @example 部分.
const Font_Montserrat = forwardRef<
  // React.ComponentRef 用于获取一个组件的 ref 类型。对于类组件，它返回类实例的类型；对于函数组件，它返回 ⁠null 或 ⁠HTMLElement 类型。
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & FontComp_CustomProps
>(
  (
    {
      className,
      children,
      usePropChildren = false,
      wrapWithTag: Tag = 'p',
      ...rest
    },
    ref
  ) => (
    <Slot ref={ref} className={cn('font-Montserrat', className)} {...rest}>
      {usePropChildren ? children : <Tag>{children}</Tag>}
    </Slot>
  )
)
const Font_MochiyPopPOne = forwardRef<
  // React.ComponentRef 用于获取一个组件的 ref 类型。对于类组件，它返回类实例的类型；对于函数组件，它返回 ⁠null 或 ⁠HTMLElement 类型。
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & FontComp_CustomProps
>(
  (
    {
      className,
      children,
      usePropChildren = false,
      wrapWithTag: Tag = 'p',
      ...rest
    },
    ref
  ) => (
    <Slot ref={ref} className={cn('font-MochiyPopPOne', className)} {...rest}>
      {usePropChildren ? children : <Tag>{children}</Tag>}
    </Slot>
  )
)
const Font_CoveredByYourGrace = forwardRef<
  // React.ComponentRef 用于获取一个组件的 ref 类型。对于类组件，它返回类实例的类型；对于函数组件，它返回 ⁠null 或 ⁠HTMLElement 类型。
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & FontComp_CustomProps
>(
  (
    {
      className,
      children,
      usePropChildren = false,
      wrapWithTag: Tag = 'p',
      ...rest
    },
    ref
  ) => (
    <Slot
      ref={ref}
      className={cn('font-CoveredByYourGrace', className)}
      {...rest}
    >
      {usePropChildren ? children : <Tag>{children}</Tag>}
    </Slot>
  )
)

Font_Montserrat.displayName = 'Font_Montserrat'
Font_MochiyPopPOne.displayName = 'Font_MochiyPopPOne'
Font_CoveredByYourGrace.displayName = 'Font_CoveredByYourGrace'

const NextFontSources = {
  mochiy_pop_one,
  montserrat,
  covered_by_your_grace
}

export {
  NextFontSources,
  Font_Montserrat,
  Font_MochiyPopPOne,
  Font_CoveredByYourGrace
}

// https://www.radix-ui.com/primitives/docs/utilities/slot
// 来自 OMEX 项目, 这封装感觉有些复杂, 但仍有参考价值. 这里的封装方式主要和 RadixUI 相关. SlotChildprops 类型这里根据组件内部逻辑使用了个人认为更易懂的 类型名FontComp_ CustomProps 与 属性名[wrapWithTag, usePropChildren]
// export const Spartan = React.forwardRef<
//   React.ComponentRef<typeof Slot>,
//   React.ComponentPropsWithoutRef<typeof Slot> & SlotChildProps
// >(({ className, children, asChild = false, as: Tag = 'p', ...rest }, ref) => (
//   <Slot ref={ref} className={cn('font-Spartan', className)} {...rest}>
//     {asChild ? children : <Tag>{children}</Tag>}
//   </Slot>
// ))
// Spartan.displayName = 'Spartan'
