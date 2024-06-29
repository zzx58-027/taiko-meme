import { Address } from 'viem'

export type TMintInfo = {
  user: Address
  term: number
  maturityTs: number
  rank: number
  amplifier: bigint
  eaaRate: bigint
}
export type StakeInfo = {
  term: number
  maturityTs: number
  amount: string
  apy: string
}
