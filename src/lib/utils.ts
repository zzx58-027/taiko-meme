import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatUnits as formatUnitsViem } from 'viem'
import Decimal from 'decimal.js'
import { TMintInfo } from '@/types/contract'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatUnits = (
  value: bigint | string | number | undefined,
  decimals?: string | number | bigint | undefined,
  precision: number = 2
) => {
  if (value === undefined || decimals == undefined) return '-'
  value = BigInt(value)
  let str = formatUnitsViem(value, Number(decimals))
  str = toDecimal(str).toFixed()

  if (str.includes('.')) {
    let [intPart, decPart] = str.split('.')
    let nonZeroDigits = ''

    for (let char of decPart) {
      if (char !== '0' || nonZeroDigits.length > 0) {
        nonZeroDigits += char
      }
      if (nonZeroDigits.length === precision) break
    }

    return addCommasToInt(intPart) + (nonZeroDigits ? '.' + nonZeroDigits : '')
  }

  return addCommasToInt(str)
}

const addCommasToInt = (intStr: string): string => {
  return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const toDecimal = (value: string | number | bigint) => {
  try {
    return new Decimal(value.toString())
  } catch (e) {
    console.log('toDecimal error', e)
  }
  return new Decimal(0)
}

export const UTC_TIME = new Date().getTime() / 1000
export const daysRemaining = (timestamp?: number) => {
  if (timestamp && timestamp > 0) {
    return (Number(timestamp) - UTC_TIME) / 86400
  } else {
    return 0
  }
}

export const progressDays = (maturityTs: number, term: number) => {
  if (maturityTs > 0 && term > 0) {
    const startTs = maturityTs - term * 86400
    const progress = (UTC_TIME - startTs) / 86400
    return progress
  }
  return 0
}

export const estimatedXEN = (globalRank: number, data?: TMintInfo) => {
  // || 不应被触发
  if (!data || Number(data.term) === 0) return 0
  console.log(data)
  const EAA = 0.1 - 0.001 * (Number(data.rank) / 1e5)
  const XEN = Math.log2(
    globalRank -
      Number(data.rank) * Number(data.term) * Number(data.amplifier) * (1 + EAA)
  )
  return XEN
}
