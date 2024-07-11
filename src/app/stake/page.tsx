'use client'
import { format } from 'date-fns'
import { ProgressBar } from '@/components/ui/progressBar'
// import { StyledDisplayKVPair, StyledTabHeader } from '@/components/ui/auto/card'
import GUI from 'lil-gui'

interface ComponentProps {
  className?: string
}

// State: Stake, EndStakeEarly, Withdraw, Buy/Mint.
const numberFormatter = new Intl.NumberFormat()
const Stake: FC<ComponentProps> = ({ className }) => {
  // TODO: GUI for page Test.
  // const gui = new GUI()
  // Stake 页面一共 3 种状态
  const [pageDebugOptions, setPageDebugOptions] = useState({
    isStakeStatus: false, // 有 BASEDPEPE 货币, 还未 Stake
    isStakedStatus: false, // 已 Stake => 提前 EndStake | 到期 (Withdraw)EndStake
    hasNoBASEDPEPEStatus: true // 没有 BASEDPEPE 货币
  })
  const debugOptionsRef = useRef(pageDebugOptions)
  // gui.add(pageDebugOptions, 'isStakeStatus')
  // gui.add(pageDebugOptions, 'isStakedStatus')
  // gui.add(pageDebugOptions, 'hasNoBASEDPEPEStatus')
  // useEffect(() => {
  //   gui.onChange((event) => {
  //     setPageDebugOptions(event.object as any)
  //   })
  // }, [])

  // 共用成员
  const [amount, setAmount] = useState(6_522_912)
  const [displayAmount, yieldAmount] = [914_724, 13_361_527].map((item) =>
    numberFormatter.format(item)
  )
  const apyPercent = 14 + '%'
  const maturityDate = format(new Date(2024, 6, 10), 'dd/M/yyyy')

  // isStake 页面的数据成员
  const [displayStakeTerms, setDisplayStakeTerms] = useState(true)
  const stakeTermsTextString =
    'Withdraw original Stake amount plus Yield at any time afterMaturity Date, or original Stake amount with 0 (zero) Yield at anytime before Maturity Date. One stake at a time per one address.'
  const amountInputAttrs = useFormattedNumberInputBind('')
  const termInDaysInputAttrs = useFormattedNumberInputBind('')

  // isStaked 页面的数据成员
  const totalBASEDPEPEAmount = numberFormatter.format(192_081)
  const [statusPercent, setStatusPercent] = useState(20)
  const statusRatio = `${statusPercent / 100}/1` // 用于 Value 部分的文字展示
  const dayTilWithdraw: number = 1 // 0: finished; others: unfinished // 用于说明文本部分的日期数展示
  const [progress, setProgress] = useState(0) // 用于进度条
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        'text-white text-nowrap',
        'bg-white bg-opacity-20 backdrop-blur-xl',
        'rounded-[32px]',
        'xs:p-5 md:p-8',
        className
      )}
    >
      <div className="debug absolute top-0 right-0"></div>

      {pageDebugOptions.isStakeStatus && (
        <React.Fragment>
          <StyledTabHeader
            iconMeta="i-lucide-badge-percent"
            headerTitle="Stake BASEDPEPE"
            className="items-center gap-1 font-bold text-[20px]"
          ></StyledTabHeader>
          <Grid className={cn('gap-5', 'my-8')}>
            <StyledDisplayKVPair keyTitle={'Amount'} directlyUsingChild={true}>
              {
                <input
                  {...amountInputAttrs}
                  className={cn(
                    'bg-transparent rounded-[8px] h-[42px]',
                    'focus:outline-none focus:ring ring-[#E91898] outline-none outline-offset-2',
                    'border border-opacity-70',
                    'p-3 '
                  )}
                />
              }
            </StyledDisplayKVPair>
            <StyledDisplayKVPair
              keyTitle={'Term, days'}
              directlyUsingChild={true}
            >
              {
                <input
                  {...termInDaysInputAttrs}
                  className={cn(
                    'bg-transparent rounded-[8px] h-[42px]',
                    'focus:outline-none focus:ring ring-[#E91898] outline-none outline-offset-2',
                    'border border-opacity-70',
                    'p-3 '
                  )}
                />
              }
            </StyledDisplayKVPair>
            <StyledDisplayKVPair keyTitle={'APY'}>
              {apyPercent}
            </StyledDisplayKVPair>
            <StyledDisplayKVPair
              keyTitle={'Yield,BASEDPEPE'}
              directlyUsingChild={true}
            >
              {
                <Font_Montserrat className="text-[#00FFB2]">
                  {yieldAmount}
                </Font_Montserrat>
              }
            </StyledDisplayKVPair>
            <StyledDisplayKVPair keyTitle={'Maturity Date'}>
              {maturityDate}
            </StyledDisplayKVPair>
            <Accordian
              accordianId={5}
              onChange={() => {
                setDisplayStakeTerms((preV) => !preV)
              }}
              titleSlot={
                <StyledDisplayKVPair
                  keyTitle={'Stake Terms'}
                  directlyUsingChild={true}
                  className="font-semibold"
                >
                  <div
                    className={cn(
                      'i-lucide-chevron-up',
                      'duration-300',
                      displayStakeTerms && 'rotate-180'
                    )}
                  />
                </StyledDisplayKVPair>
              }
            >
              <Font_Montserrat
                className={cn(
                  'text-pretty opacity-70',
                  'mt-2',
                  'xs:text-[12px] md:text-[16px]'
                )}
              >
                {stakeTermsTextString}
              </Font_Montserrat>
            </Accordian>
          </Grid>
          <Flex className={cn('justify-center', 'xs:gap-4 md:gap-8')}>
            <MyButton buttonStatus="forward">
              <Font_MochiyPopPOne>Stake</Font_MochiyPopPOne>
            </MyButton>
          </Flex>
        </React.Fragment>
      )}
      {pageDebugOptions.isStakedStatus && (
        <React.Fragment>
          <StyledTabHeader
            iconMeta="i-lucide-file-text"
            headerTitle="Stake Details"
            className="items-center gap-1 font-bold text-[20px]"
          ></StyledTabHeader>
          <Grid className={cn('gap-5', 'my-8')}>
            <StyledDisplayKVPair keyTitle={'Amount'}>
              {displayAmount}
            </StyledDisplayKVPair>
            <StyledDisplayKVPair keyTitle={'APY'}>
              {apyPercent}
            </StyledDisplayKVPair>
            <StyledDisplayKVPair keyTitle={'Yield,BASEDPEPE'}>
              {yieldAmount}
            </StyledDisplayKVPair>
            {dayTilWithdraw === 0 && (
              <StyledDisplayKVPair keyTitle={'Total BASEDPEPE amount'}>
                {totalBASEDPEPEAmount}
              </StyledDisplayKVPair>
            )}
            <StyledDisplayKVPair keyTitle={'Maturity Date'}>
              {dayTilWithdraw === 0 && <div className="i-lucide-check"></div>}
              {dayTilWithdraw !== 0 && maturityDate}
            </StyledDisplayKVPair>
            {dayTilWithdraw !== 0 && (
              <React.Fragment>
                <StyledDisplayKVPair
                  className="gap-3"
                  keyItemSlot={
                    <ProgressBar.Root
                      value={progress}
                      className="relative overflow-hidden bg-[#FFDFF3] rounded-full w-full h-5"
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <ProgressBar.Indicator
                        className="bg-[#E91898] w-full h-full"
                        style={{
                          transform: `translateX(-${100 - progress}%)`,
                          transition:
                            'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)'
                        }}
                      ></ProgressBar.Indicator>
                    </ProgressBar.Root>
                  }
                >
                  {statusRatio}
                </StyledDisplayKVPair>
                <Font_Montserrat className="text-center text-pretty">
                  Wait {dayTilWithdraw} days until Maturity Date
                  <br /> OR <br />
                  end stake early without penalty
                </Font_Montserrat>
              </React.Fragment>
            )}
            {dayTilWithdraw === 0 && (
              <React.Fragment>
                <StyledDisplayKVPair></StyledDisplayKVPair>
                <Font_Montserrat className="text-center text-wrap">
                  You can end stake and withdraw BASEDPEPE at any time with no
                  penalty.
                </Font_Montserrat>
              </React.Fragment>
            )}
          </Grid>
          <Flex className={cn('justify-center', 'xs:gap-4 md:gap-8')}>
            {dayTilWithdraw === 0 && (
              <MyButton buttonStatus="forward">
                <Font_MochiyPopPOne>Withdraw</Font_MochiyPopPOne>
              </MyButton>
            )}
            {dayTilWithdraw !== 0 && (
              <MyButton buttonStatus="forward">End Stake Early</MyButton>
            )}
          </Flex>
        </React.Fragment>
      )}
      {pageDebugOptions.hasNoBASEDPEPEStatus && (
        <React.Fragment>
          <StyledTabHeader
            iconMeta="i-lucide-badge-percent"
            headerTitle="Stake BASEDPEPE"
            className="items-center gap-1 font-bold text-[20px]"
          ></StyledTabHeader>
          <Grid
            className={cn(
              'gap-10',
              'my-8',
              'xs:py-10 lg:py-15',
              'justify-items-center'
            )}
          >
            <div
              className={cn('w-[128px] h-[97px] bg-no-repeat')}
              style={{
                backgroundImage: 'url(/sources/Stake_noBASEDPEPE.png)'
              }}
            />
            <Font_Montserrat
              className={cn('opacity-70', 'text-pretty text-center')}
            >
              You need to mint or obtain some BASEDPEPE to stake it.
            </Font_Montserrat>
          </Grid>
          <Flex className={cn('', 'xs:gap-4 md:gap-8')}>
            <MyButton className="w-full" variant={'outline'}>
              <Font_MochiyPopPOne>Mint</Font_MochiyPopPOne>
            </MyButton>
            <MyButton className="w-full">
              <Font_MochiyPopPOne>Buy</Font_MochiyPopPOne>
            </MyButton>
          </Flex>
        </React.Fragment>
      )}
    </div>
  )
}
export default Stake
