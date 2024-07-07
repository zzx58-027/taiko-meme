import { TMintInfo, TStakeInfo, XenStatus } from '@/types/contract'
import { getContracts } from '@/config/contracts'
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  useReadContracts
} from 'wagmi'

export const useContracts = () => {
  const chainId = useChainId()
  return getContracts(chainId, 'latest')
}

export const useXenStatus = () => {
  const contracts = useContracts()
  const { address } = useAccount()
  const xen = contracts.xen
  const {
    data: userBalance,
    isError: balanceIsError,
    isLoading: balanceIsLoading
  } = useBalance({
    address: address,
    token: xen.address
  })

  // get user mint info
  const {
    data: userStake,
    isError: userStakeIsError,
    isLoading: userStakeIsLoading
  } = useReadContract({
    ...xen,
    functionName: 'getUserStake'
  })
  const {
    data: userMint,
    isError: userMintIsError,
    isLoading: userMintIsLoading
  } = useReadContract({
    ...xen,
    functionName: 'getUserMint'
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
    ]
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
      globalRank: data[0].result as number,
      activeMinters: data[1].result as number,
      activeStakes: data[2].result as number,
      totalXenStaked: data[3].result as string,
      totalSupply: data[4].result as string,
      genesisTs: data[5].result as number,
      currentMaxTerm: data[6].result as number,
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
