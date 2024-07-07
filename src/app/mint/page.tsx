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
import { ChangeEvent, useState } from 'react'
import { useXenStatus } from '@/hooks/useXen'

const Page = () => {
  const [term, setTerm] = useState('')
  const { data, isLoading, isError } = useXenStatus()

  const card = {
    title: 'Fair mint Pepe',
    description: 'Card Description'
  }
  const inputPlaceholder = `Term, days(1 - ${Number(data?.currentMaxTerm) / 86400 ?? 86400})`

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value)
  }

  const handleBlur = () => {
    if (term === '') setTerm('1')
    if (Number(term) < 1) setTerm('1')
    if (Number(term) > Number(data?.currentMaxTerm) / 86400)
      setTerm(Number(data?.currentMaxTerm) / 86400 + '')
  }

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Global Rank: {data?.globalRank.toString()}</p>
        <Input
          placeholder={inputPlaceholder}
          value={term}
          onChange={handleValueChange}
          onBlur={handleBlur}
        />
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Claim Rank
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Page
