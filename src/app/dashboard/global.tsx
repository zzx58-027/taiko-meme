'use client'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useXenStatus } from '@/hooks/useXen'
import { NumericFormat } from 'react-number-format'

const GlobalRankCard = () => {
  const { data, isLoading, isError } = useXenStatus()
  return (
    <Card className="sm:w-full">
      <CardTitle>
        Global Rank:
        <NumericFormat value={data?.globalRank} thousandSeparator="," />
      </CardTitle>
      <CardContent className="flex flex-col">
        <div>
          Active Minters:
          <NumericFormat
            value={data?.activeMinters.toString()}
            thousandSeparator=","
          />
        </div>
        <div>
          Active Stakes:
          <NumericFormat
            value={data?.activeStakes.toString()}
            thousandSeparator=","
          />
        </div>
        {/* TODO: days ago */}
        <div>
          Time Since Genesis:
          <NumericFormat
            value={data?.genesisTs.toString()}
            thousandSeparator=","
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default GlobalRankCard
