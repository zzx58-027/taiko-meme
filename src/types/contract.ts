import { Address } from 'viem'
import { GetBalanceData } from 'wagmi/query'


export type TMintInfo = {
  user: Address
  term: number
  maturityTs: number
  rank: number
  amplifier: bigint
  eaaRate: bigint
}

export type TStakeInfo = {
  term: number
  maturityTs: number
  amount: string
  apy: string
}

export type XenStatus = {
  balance?: GetBalanceData,
  userMint?: TMintInfo,
  userStake?: TStakeInfo,
  globalRank: number
  activeMinters: number
  activeStakes: number
  totalXenStaked: string
  totalSupply: string
  genesisTs: number
  currentMaxTerm: number
  currentAMP: bigint
  currentEAAR: bigint
  currentAPY: bigint
  grossReward?: bigint
}