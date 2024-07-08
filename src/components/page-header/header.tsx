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
  return (
    <header
      className={cn(
        'flex items-center justify-between',
        'xs:px-[16px] lg:px-[24px]',
        'text-white',
        className
      )}
    >
      <LogoContainer
        className={cn('xs:h-[36px] lg:h-[32px]')}
        itemsGap="gap-4"
        logoSrc={logoSrc}
      />
      <Flex className="items-center">
        <NavLinks className="xs:hidden lg:flex lg:mr-3 xl:mr-[80px]" />
        {/* Web3Modal 提供的 w3m-button 系列组件是 WebComponent, 无需自动导入, 但一个问题是其无法/难以定制化外观表现(字体, 头像), 因此我们需要重写一个组件. https://docs.walletconnect.com/appkit/next/core/installation */}
        <w3m-button label="Wallet Connect"></w3m-button>
        <div className={cn('xs:flex lg:hidden', 'i-lucide-menu text-[24px]')} />
      </Flex>
    </header>
  )
}

const NavLinks: React.FC<ComponentProps> = ({ className }) => {
  return (
    <nav className={cn('flex gap-4', className)}>
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
