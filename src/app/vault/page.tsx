'use client'
// import { StyledDisplayKVPair, StyledTabHeader } from '@/components/ui/auto/card'

const Vault = () => {
  const numberFormatter = useRef(new Intl.NumberFormat()).current
  const userRank = 5_000
  const globalRank = 315_739_255
  const displayRank =
    numberFormatter.format(userRank) +
    ' / ' +
    numberFormatter.format(globalRank)
  const displayActivePot = 0.2322 + ' ETH'
  const displayUserEarning = 0.0 + ' ETH'

  const withdrawHintText =
    'Withdraw original Stake amount plus Yield at any time afterMaturity Date, or original Stake amount with 0 (zero) Yield at anytime before Maturity Date. One stake at a time per one address.'
  return (
    <div
      className={cn(
        'text-white text-nowrap',
        'bg-white bg-opacity-20 backdrop-blur-xl',
        'rounded-[32px]',
        'xs:p-5 md:p-8'
      )}
    >
      <StyledTabHeader
        iconMeta="i-lucide-file-key"
        headerTitle="Vault"
        className="items-center gap-1 font-bold text-[20px]"
      ></StyledTabHeader>
      <Grid className="gap-5 my-8">
        <StyledDisplayKVPair
          keyTitle="Your Rank / Global Rank"
          className="items-start font-semibold"
          valueItemClassName="xs:text-wrap xs:text-end"
        >
          {displayRank}
        </StyledDisplayKVPair>
        <StyledDisplayKVPair keyTitle="Active Pot">
          {displayActivePot}
        </StyledDisplayKVPair>
        <StyledDisplayKVPair keyTitle="Contract Will Dratin In">
          {displayUserEarning}
        </StyledDisplayKVPair>
        <Font_Montserrat className="text-pretty opacity-70">
          {withdrawHintText}
        </Font_Montserrat>
      </Grid>
      <Flex className={cn('justify-center', 'xs:gap-4 md:gap-8')}>
        <MyButton buttonStatus="forward" variant={'outline'}>
          <Font_MochiyPopPOne>Claim</Font_MochiyPopPOne>
        </MyButton>
      </Flex>
    </div>
  )
}
export default Vault
