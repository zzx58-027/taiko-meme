import { getContracts } from '@/config/contracts'
import { useChainId } from 'wagmi'

export const useContracts = () => {
  const chainId = useChainId()
  return getContracts(chainId, 'latest')
}
