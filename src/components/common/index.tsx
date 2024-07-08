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
export { LogoContainer }
