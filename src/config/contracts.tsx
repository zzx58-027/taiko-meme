import { Address } from 'viem'
import XenABI from './abis/Xen.json'

type TContractInfo = {
  xen: {
    address: Address
    abi: typeof XenABI
  }
}

type TContracts = {
  [chainId: number]: TContractInfo
}

export const v0Contracts: TContracts = {
  31337: {
    xen: {
      address: '0x0',
      abi: XenABI
    }
  },
  1: {
    xen: {
      // official xen address
      address: '0x06450dEe7FD2Fb8E39061434BAbCFC05599a6Fb8',
      abi: XenABI
    }
  }
}

const versions = ['v0']

const perpContracts: Record<string, TContracts> = {
  [versions[0]]: v0Contracts
  // Assuming you will add versions v2 and v3 in the future
}

const defaultContracts = v0Contracts[1]

export const getContracts = (chainId: number, version: string) => {
  if (version === 'latest') {
    version = versions[versions.length - 1]
  }

  const contractsForVersion = perpContracts[version]
  if (!contractsForVersion) {
    console.warn(
      `No contracts found for version ${version}, use default contracts`
    )
    return defaultContracts
  }

  const contractsForChain = contractsForVersion[chainId]
  if (!contractsForChain) {
    console.warn(
      `No contracts found for chain ${chainId}, use default contracts`
    )
    return defaultContracts
  }

  return contractsForChain
}
