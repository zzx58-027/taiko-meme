'use client'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useXenStatus } from '@/hooks/useXen'

const SummaryCard = () => {
  const { data, isLoading, isError } = useXenStatus()

  return (
    <Card className="sm:w-full">
      <CardTitle>Summary</CardTitle>
      <CardContent className="flex flex-col">
        <div>Total Supply : {data?.totalSupply.toString()}</div>
        <div>Liquid Supply : {data?.totalSupply.toString()}</div>
        <div>Total Staked: {data?.totalXenStaked.toString()}</div>
      </CardContent>
    </Card>
  )
}

export default SummaryCard
