import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatUnits as formatUnitsViem } from 'viem'
import Decimal from 'decimal.js'

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
