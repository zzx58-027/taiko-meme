import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { useXenStatus } from '@/hooks/useXen'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useState } from 'react'
import { Button } from '@/components/ui/auto/button'
import { estimatedXEN } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const MintDetails = () => {
  const { data, isLoading, isError } = useXenStatus()
  const [tab, setTab] = useState('claim')
  return (
    <Card className="sm:w-full">
      <CardTitle>Mint Details</CardTitle>
      <CardContent className="flex flex-col">
        <div>cRank : {data?.userMint?.rank.toString()}</div>
        <div>AMP : {data?.userMint?.amplifier.toString()}</div>
        <div>EAA: {data?.userMint?.eaaRate.toString()}</div>
        <div>Term,days: {data?.userMint?.term.toString()}</div>
        <div>
          Estimated BASEDPEPE:{' '}
          {estimatedXEN(Number(data?.globalRank), data?.userMint)}
        </div>
        {/* TODO: progress bar */}
        <Tabs
          defaultValue="claim"
          className="w-full"
          onValueChange={(v) => {
            setTab(v)
          }}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Claim">Claim</TabsTrigger>
            <TabsTrigger value="Claim + Share">Claim+Share</TabsTrigger>
            <TabsTrigger value="Claim + Stake">Claim+Stake</TabsTrigger>
          </TabsList>
          <TabsContent value="Claim"></TabsContent>
          <TabsContent value="Claim + Share">
            <Input placeholder="Address"></Input>
            {/* TODO input address */}
          </TabsContent>
          <TabsContent value="Claim + Stake">
            {/* TODO input term */}
            <Input placeholder="Term"></Input>
          </TabsContent>
        </Tabs>
        <CardFooter>
          <Button variant="outline" className="w-full">
            {tab}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default MintDetails
