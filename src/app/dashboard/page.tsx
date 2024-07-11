// import AdditionalCard from './additional'
// import GlobalRankCard from './global'
// import SummaryCard from './summary'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { formatDistanceToNow, formatDistance } from 'date-fns'

const Dashboard = () => {
  return (
    // <div className="flex gap-1">
    //   <GlobalRankCard></GlobalRankCard>
    //   <SummaryCard></SummaryCard>
    //   <AdditionalCard></AdditionalCard>
    // </div>
    <React.Fragment>
      <Grid
        className={cn(
          'xs:grid-cols-1 xl:grid-cols-2',
          'xs:gap-3 lg:gap-4',
          'lg:min-w-[580px]'
        )}
      >
        <GlobalRankCard className={cn('xs:col-span-1 lg:col-span-2')} />
        <SummaryCard />
        <AdditionalCard />
      </Grid>
    </React.Fragment>
  )
}

export default Dashboard

interface ComponentProps {
  className?: string
}

const numberFormater = new Intl.NumberFormat()

const GlobalRankCard: FC<ComponentProps> = ({ className }) => {
  // const timeSinceGenesis = '2 years'
  const rtFormatter = new Intl.RelativeTimeFormat('en')
  const timeSinceGenesis = rtFormatter
    .formatToParts(2, 'year')
    .map((item) => item.value)
    .slice(1)
    .join('')
  // const timeSinceGenesis = formatDistanceToNow(new Date(2022, 6, 1))
  const [activeMinters, activeStakes, globalRank] = [
    6_522_912, 19_921, 282_372
  ].map((item) => numberFormater.format(item))
  return (
    <Grid
      className={cn(
        'text-white text-nowrap gap-5 bg-white bg-opacity-20 p-5 rounded-[16px] backdrop-blur-xl',
        className
      )}
    >
      <Flex className="items-center gap-1 font-bold mb-3 text-[20px]">
        <div className="grid place-content-center size-6 rounded-full bg-opacity-20 bg-white mr-2">
          <div className="i-lucide-bar-chart text-[16px]" />
        </div>
        <Font_Montserrat className="">Global Rank</Font_Montserrat>
        <div className="i-lucide-message-circle-question hover:cursor-pointer text-[20px]" />
        <Font_Montserrat className="basis-full text-end">
          {globalRank}
        </Font_Montserrat>
      </Flex>
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">Active Minters</Font_Montserrat>
        <Font_Montserrat className="basis-full text-end">
          {activeMinters}
        </Font_Montserrat>
      </Flex>
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">Active Stakes</Font_Montserrat>
        <Font_Montserrat className="basis-full text-end">
          {activeStakes}
        </Font_Montserrat>
      </Flex>
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">
          Time Since Genesis
        </Font_Montserrat>
        <Font_Montserrat className="basis-full text-end">
          {timeSinceGenesis}
        </Font_Montserrat>
      </Flex>
    </Grid>
  )
}
const SummaryCard: FC<ComponentProps> = ({ className }) => {
  const [totalSupply, liquidSupply, totalStaked] = [
    134_580_552_934_330, 114_580_552_934_330, 28_580_552_934_330
  ].map((item) => numberFormater.format(item))
  return (
    <Grid
      className={cn(
        'text-white text-nowrap gap-5 bg-white bg-opacity-20 p-5 rounded-[16px] backdrop-blur-xl',
        'min-w-max',
        className
      )}
    >
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">Total Supply</Font_Montserrat>
        <Font_Montserrat className="basis-full text-end">
          {totalSupply}
        </Font_Montserrat>
      </Flex>
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">Liquid Supply</Font_Montserrat>
        <Font_Montserrat className="basis-full text-end">
          {liquidSupply}
        </Font_Montserrat>
      </Flex>
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">Total Staked</Font_Montserrat>
        <Font_Montserrat className="basis-full text-end">
          {totalStaked}
        </Font_Montserrat>
      </Flex>
    </Grid>
  )
}

const AdditionalCard: FC<ComponentProps> = ({ className }) => {
  const maxTermDays = 466
  const currentAMP = new Intl.NumberFormat().format(2_912)
  const currentEAAR = 0 + '%'
  const currentAPY = 14 + '%'
  return (
    <Grid className="text-white text-nowrap gap-5 bg-white bg-opacity-20 p-5 rounded-[16px] backdrop-blur-xl">
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">Max Term, days</Font_Montserrat>
        <Font_Montserrat className="basis-full text-end">
          {maxTermDays}
        </Font_Montserrat>
      </Flex>
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">AMP</Font_Montserrat>
        <div className="i-lucide-message-circle-question hover:cursor-pointer" />
        <Font_Montserrat className="basis-full text-end">
          {currentAMP}
        </Font_Montserrat>
      </Flex>
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">EAA</Font_Montserrat>
        <div className="i-lucide-message-circle-question hover:cursor-pointer" />
        <Font_Montserrat className="basis-full text-end">
          {currentEAAR}
        </Font_Montserrat>
      </Flex>
      <Flex className="items-center gap-1 font-semibold">
        <Font_Montserrat className="opacity-70">APY</Font_Montserrat>
        <div className="i-lucide-message-circle-question hover:cursor-pointer" />
        <Font_Montserrat className="basis-full text-end">
          {currentAPY}
        </Font_Montserrat>
      </Flex>
    </Grid>
  )
}
