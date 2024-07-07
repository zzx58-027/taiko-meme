import { TMintInfo, TStakeInfo, XenStatus } from '@/types/contract'
import { getContracts } from '@/config/contracts'
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  useReadContracts
} from 'wagmi'
import { formatUnits } from '@/lib/utils'

export const useContracts = () => {
  const chainId = useChainId()
  return getContracts(chainId, 'latest')
}

export const useXenStatus = () => {
  const gcTime = 10000
  const contracts = useContracts()
  const { address } = useAccount()
  const xen = contracts.xen
  const {
    data: userBalance,
    isError: balanceIsError,
    isLoading: balanceIsLoading
  } = useBalance({
    address: address,
    token: xen.address,
    query: {
      gcTime
    }
  })

  // get user mint info
  const {
    data: userStake,
    isError: userStakeIsError,
    isLoading: userStakeIsLoading
  } = useReadContract({
    ...xen,
    functionName: 'getUserStake',
    query: {
      gcTime
    }
  })
  const {
    data: userMint,
    isError: userMintIsError,
    isLoading: userMintIsLoading
  } = useReadContract({
    ...xen,
    functionName: 'getUserMint',
    query: {
      gcTime
    }
  })

  const { data, isError, isLoading } = useReadContracts({
    contracts: [
      {
        ...xen,
        functionName: 'globalRank'
      },
      {
        ...xen,
        functionName: 'activeMinters'
      },
      {
        ...xen,
        functionName: 'activeStakes'
      },
      {
        ...xen,
        functionName: 'totalXenStaked'
      },
      {
        ...xen,
        functionName: 'totalSupply'
      },
      {
        ...xen,
        functionName: 'genesisTs'
      },
      {
        ...xen,
        functionName: 'getCurrentMaxTerm'
      },
      {
        ...xen,
        functionName: 'getCurrentAMP'
      },
      {
        ...xen,
        functionName: 'getCurrentEAAR'
      },
      {
        ...xen,
        functionName: 'getCurrentAPY'
      }
    ],
    query: {
      gcTime
    }
  })

  let xenStatus: XenStatus = {
    globalRank: 0,
    activeMinters: 0,
    activeStakes: 0,
    totalXenStaked: '0',
    totalSupply: '0',
    genesisTs: 0,
    currentMaxTerm: 0,
    currentAMP: BigInt(0),
    currentEAAR: BigInt(0),
    currentAPY: BigInt(0)
  }

  if (data) {
    xenStatus = {
      globalRank: Number(data[0].result),
      activeMinters: Number(data[1].result),
      activeStakes: Number(data[2].result),
      totalXenStaked: formatUnits(data[3].result as bigint, 18),
      totalSupply: formatUnits(data[4].result as bigint, 18),
      genesisTs: Number(data[5].result),
      currentMaxTerm: Number(data[6].result),
      currentAMP: data[7].result as bigint,
      currentEAAR: data[8].result as bigint,
      currentAPY: data[9].result as bigint
    }
  }

  if (userMint && address) {
    xenStatus.userMint = userMint as TMintInfo
  }

  if (userStake && address) {
    xenStatus.userStake = userStake as TStakeInfo
  }

  if (userBalance && address) {
    xenStatus.balance = userBalance
  }

  return {
    data: xenStatus,
    isLoading:
      isLoading || balanceIsLoading || userMintIsLoading || userStakeIsLoading,
    isError: isError || balanceIsError || userMintIsError || userStakeIsError
  }
}
