'use client'
import { usePathname } from 'next/navigation'
interface ComponentProps {
  className: string
}

export { LogoContainer, PageTextHeroBanner }

const LogoContainer = ({
  className,
  itemsGap,
  logoTextStyle,
  logoSrc
}: {
  className?: string
  itemsGap?: string
  logoSrc: string
  logoTextStyle?: string
}) => {
  return (
    <NextLink href="/">
      <Flex className={cn('items-center', className, itemsGap)}>
        <NextImage
          width={0}
          height={0}
          src={logoSrc}
          sizes="max"
          className="h-full w-auto"
          alt="pepe-avatar"
        />
        <Font_MochiyPopPOne className={cn(logoTextStyle)}>
          BASEDPEPE
        </Font_MochiyPopPOne>
      </Flex>
    </NextLink>
  )
}

const PageTextHeroBanner: FC<ComponentProps> = ({ className }) => {
  // 在 App 路由系统中, 获取路由相关内容需要和 Page 路由系统中区别开来.
  // https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-5-migrating-routing-hooks
  const currentPath = usePathname().slice(1).toUpperCase()
  return (
    <Font_CoveredByYourGrace className={cn(className)}>
      {currentPath}
    </Font_CoveredByYourGrace>
  )
}
