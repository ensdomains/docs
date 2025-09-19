import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Hex } from 'viem'
import { bytesToString, hexToBytes } from 'viem/utils'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: Hex) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function bytesToPacket(bytesString: Hex): string {
  const bytes = hexToBytes(bytesString)
  let offset = 0
  let result = ''

  while (offset < bytes.length) {
    const len = bytes[offset]
    if (len === 0) {
      offset += 1
      break
    }

    result += `${bytesToString(bytes.subarray(offset + 1, offset + len + 1))}.`
    offset += len + 1
  }

  return result.replace(/\.$/, '')
}
