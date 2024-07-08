import { Flex } from '../ui/auto/box'
import { LogoContainer } from '../common'

const logoSrc = '/sources/pepe-avatar.svg'

interface ComponentProps {
  className?: string
  logoContainerClass?: string
  copyRightClass?: string
}

export const Footer: FC<ComponentProps> = ({
  className,
  logoContainerClass,
  copyRightClass
}) => {
  return (
    <div className={cn('', className)}>
      <LogoContainer
        logoSrc={logoSrc}
        className={cn('gap-1', 'xs:h-[24px] lg:h-[32px]', logoContainerClass)}
      />
      <Font_Montserrat className={cn('text-[14px]', copyRightClass)}>
        © {new Date().getFullYear()} basedpepe.meme
      </Font_Montserrat>
    </div>
  )
}
