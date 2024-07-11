'use client'
import React from 'react'
import { LogoContainer } from '../common'

// Static Configurations
const logoSrc = '/sources/pepe-avatar.svg'
const navLinks = [
  {
    label: 'Dashboard',
    url: '/dashboard'
  },
  { label: 'Mint', url: '/mint' },
  { label: 'Vault', url: '/vault' },
  { label: 'Stake', url: '/stake' }
]

interface ComponentProps {
  className?: string
}

// UI Behave Part
const Header: React.FC<ComponentProps> = ({ className }) => {
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false)
  return (
    <header
      className={cn(
        'relative flex',
        'items-center justify-between',
        'xs:px-[16px] lg:px-[24px]',
        'text-white',
        // 圆角样式本该在 layout 页面中进行设备并传入, 但因为移动端需求特殊, 这里需要转移进来配置.
        // rounded-t-60px 和 rounded-60px 区别需注意
        // 'duration-100',
        // 'bg-white bg-opacity-20',
        'before:content-[""] before:absolute before:-z-10',
        'before:top-0 before:left-0 before:right-0 before:bottom-0',
        'before:backdrop-blur-[24px]',
        'before:duration-50',
        'before:bg-white before:bg-opacity-20 ',
        'rounded-t-[30px] before:rounded-t-[30px]',
        ' lg:rounded-[60px] lg:before:rounded-[60px]',
        !displayMobileMenu &&
          cn('rounded-b-[30px] before:rounded-b-[30px] before:delay-300'),
        className
      )}
    >
      {/* <div className="absolute z-20 flex items-center justify-between"> */}
      <LogoContainer
        className={cn('xs:h-[36px] lg:h-[32px]')}
        itemsGap="gap-4"
        logoSrc={logoSrc}
      />
      <Flex className="items-center">
        <NavLinks className="xs:hidden lg:flex lg:mr-3 xl:mr-[80px] gap-4" />
        {/* Web3Modal 提供的 w3m-button 系列组件是 WebComponent, 无需自动导入, 但一个问题是其无法/难以定制化外观表现(字体, 头像), 因此我们需要重写一个组件. https://docs.walletconnect.com/appkit/next/core/installation */}
        <w3m-button label="Wallet Connect"></w3m-button>
        <div
          onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
          className={cn(
            'xs:flex lg:hidden',
            'i-lucide-menu text-[24px]',
            'hover:cursor-pointer',
            'ml-3'
          )}
        />
      </Flex>
      {/* </div> */}

      {/* !!!Notice: absolute 元素的 top-[100%] 的巧妙使用. */}
      <Accordian
        accordianId={0}
        useLogicControll={displayMobileMenu}
        accordianWrapperClassName={cn(
          'absolute z-[10]',
          'top-[100%] left-0',
          'rounded-b-[30px]',

          'w-full',
          // FIXME: backdrop-filter 属性父子组件不能同时用?
          'backdrop-blur-[24px] bg-white bg-opacity-20'
        )}
        // accordianContentClassName={cn('duration-300')}
      >
        {/* 空白过渡占位 */}
        <Grid className={cn('grid gap-6', 'py-12 px-4')}>
          {navLinks.map((linkItem) => (
            <NextLink href={linkItem.url}>
              <div className="flex justify-between items-center px-5 py-2 hover:text-[#E91898]">
                <Font_MochiyPopPOne>{linkItem.label}</Font_MochiyPopPOne>
                <div className="i-lucide-chevron-right text-[24px]" />
              </div>
            </NextLink>
          ))}
        </Grid>
      </Accordian>
    </header>
  )
}

const NavLinks: React.FC<ComponentProps> = ({ className }) => {
  return (
    <nav className={cn(className)}>
      {navLinks.map((linkItem) => (
        <NextLink href={linkItem.url}>
          <Font_MochiyPopPOne className="hover:text-[#E91898]">
            {linkItem.label}
          </Font_MochiyPopPOne>
        </NextLink>
      ))}
    </nav>
  )
}

// Elements Export
export { Header }
