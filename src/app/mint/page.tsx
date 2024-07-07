'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useContracts, useXenStatus } from '@/hooks/useXen'
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError
} from 'wagmi'
import { useToast } from '@/components/ui/use-toast'
import React, { useEffect, useState } from 'react'
import { estimatedXEN } from '@/lib/utils'
import MintDetails from './details'
const Page = () => {
  const [term, setTerm] = useState('')
  const { data, isLoading, isError } = useXenStatus()
  const { toast } = useToast()
  const contracts = useContracts()

  const card = {
    title: 'Fair mint Pepe',
    description: 'Card Description'
  }
  const inputPlaceholder = `Term, days(1 - ${Number(data?.currentMaxTerm) / 86400 ?? 86400})`

  const { data: hash, error, isPending, writeContract } = useWriteContract()
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    let term = formData.get('term') as string
    if (!term) term = '0'
    if (Number(term) < 1) term = '1'
    if (Number(term) > Number(data?.currentMaxTerm) / 86400)
      term = Number(data?.currentMaxTerm) / 86400 + ''
    setTerm(term)
    writeContract({
      address: contracts.xen.address,
      abi: contracts.xen.abi,
      functionName: 'claimRank',
      args: [BigInt(term)]
    })
  }

  // TODO: useEffect to change component state on transaction success
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash
    })

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        description: (error as BaseError)?.shortMessage || error.message
      })
    }
  }, [error, toast])

  let showDetails = data && data.userMint?.term !== BigInt(0)
  // for debug
  showDetails = true

  if (showDetails) {
    return <MintDetails />
  }

  return (
    <form onSubmit={submit}>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>{card.title}</CardTitle>
          <CardDescription>{card.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Global Rank: {data?.globalRank.toString()}</p>
          <Input placeholder={inputPlaceholder} name="term" />
          <p>
            Estimated BASEDPEPE: {estimatedXEN(Number(term), data.userMint)}
          </p>
          {/* TODO */}
          <p>Contract will drain in:</p>
          {/* TODO */}
          <p>Fair mint Fee: 0</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Claim Rank
          </Button>
        </CardFooter>
        <MintDetails />
      </Card>
    </form>
  )
}

export default Page
