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
import { Button } from '@/components/ui/auto/button'
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

import { add, differenceInMilliseconds } from 'date-fns'

const Page: FC<{ className: string }> = ({ className }) => {
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

  // if (showDetails) {
  //   return <MintDetails />
  // }
  // FaitMintPage 成员
  const termInDaysInputAttrs = useFormattedNumberInputBind('')
  const [globalRank, estimatedBASEDPEPE] = [5_000, 4_722].map(
    new Intl.NumberFormat().format
  )
  const calcCountdown = (totalMillSeconds: number) => {
    const MS_PER_SECOND = 1000
    const MS_PER_MINUTE = MS_PER_SECOND * 60
    const MS_PER_HOUR = MS_PER_MINUTE * 60
    // const MS_PER_DAY = MS_PER_HOUR * 24
    // const totalSeconds = 3 * 24 * 60 * 60 * MS_PER_SECOND
    const hours = Math.floor(totalMillSeconds / MS_PER_HOUR)
      .toString()
      .padStart(2, '0')
    const minutes = Math.floor((totalMillSeconds % MS_PER_HOUR) / MS_PER_MINUTE)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor(
      (totalMillSeconds % MS_PER_MINUTE) / MS_PER_SECOND
    )
      .toString()
      .padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
  const [contractDrainCountdown, setContractDrainCountdown] =
    useState('00:00:00')
  const startTS = useRef(new Date())
  const deadlineTS = useRef(add(startTS.current, { days: 3 }))
  useEffect(() => {
    const tick = setInterval(() => {
      const countdownSeconds = differenceInMilliseconds(
        deadlineTS.current,
        new Date()
      )
      setContractDrainCountdown(calcCountdown(countdownSeconds))
    }, 1000)
    return () => clearTimeout(tick)
  })
  const fairMintFee = 0.0023 + ' ETH'

  return (
    <form onSubmit={submit}>
      <div
        className={cn(
          'text-white text-nowrap',
          'bg-white bg-opacity-20 backdrop-blur-xl',
          'rounded-[32px]',
          'xs:p-5 md:p-8',
          className
        )}
      >
        <StyledTabHeader
          iconMeta="i-lucide-stars"
          headerTitle="Fair Mint BASEDPEPE"
          className="items-center gap-1 font-bold text-[20px]"
        ></StyledTabHeader>
        <Grid
          className={cn(
            'gap-5',
            'my-8',
            'grid-cols-[1fr_auto]',
            '[&_p:nth-child(even)]:text-end',
            '[&_p:nth-child(odd)]:opacity-70',
            'font-semibold',
            'items-center'
          )}
        >
          <div className="contents">
            <Font_Montserrat>Term, days (1 - 100)</Font_Montserrat>
            <input
              {...termInDaysInputAttrs}
              className={cn(
                'bg-transparent rounded-[8px] h-[42px]',
                'focus:outline-none focus:ring ring-[#E91898] outline-none outline-offset-2',
                'border border-opacity-70',
                'p-3 w-full'
              )}
            />
          </div>
          {/*
            // TODO:
            <p>Global Rank: {data?.globalRank.toString()}</p>
            <Input placeholder={inputPlaceholder} name="term" />
            <p>
              Estimated BASEDPEPE: {estimatedXEN(Number(term), data.userMint)}
            </p> 
          */}
          <div className="contents">
            <Font_Montserrat>Global Rank</Font_Montserrat>
            <Font_Montserrat>{globalRank}</Font_Montserrat>
          </div>
          <div className="contents">
            <Font_Montserrat>Estimated BASEDPEPE</Font_Montserrat>
            <Font_Montserrat>{estimatedBASEDPEPE}</Font_Montserrat>
          </div>
          <div className="contents">
            <Font_Montserrat>Contract Will Drain In</Font_Montserrat>
            <Font_Montserrat>{contractDrainCountdown}</Font_Montserrat>
          </div>
          <div className="contents">
            <div className="flex items-center gap-1">
              <Font_Montserrat>Fait Mint Fee</Font_Montserrat>
              <div className="i-lucide-message-circle-question" />
            </div>
            <Font_Montserrat>{fairMintFee}</Font_Montserrat>
          </div>
        </Grid>
        <Flex className={cn('justify-center', 'xs:gap-4 md:gap-8')}>
          <MyButton buttonStatus="forward" variant={'primary'}>
            <Font_MochiyPopPOne>Fait Mint</Font_MochiyPopPOne>
          </MyButton>
        </Flex>
      </div>
    </form>
  )
}

export default Page
