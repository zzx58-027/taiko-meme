'use client'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useXenStatus } from '@/hooks/useXen'

const AdditionalCard = () => {
  const { data, isLoading, isError } = useXenStatus()
  return (
    <Card className="sm:w-full">
      <CardTitle>
        Max Term, days : {Number(data?.currentMaxTerm) / 86400 ?? 86400}
      </CardTitle>
      <CardContent className="flex flex-col">
        <div>AMP: {data?.currentAMP.toString()}</div>
        <div>EAA: {data?.currentEAAR.toString()}</div>
        <div>APY: {data?.currentAPY.toString() + '%'}</div>
      </CardContent>
    </Card>
  )
}

export default AdditionalCard
