import { useMemo, useState } from 'react'
import { isHex, keccak256, namehash, toHex } from 'viem'
import { normalize, packetToBytes } from 'viem/ens'

import { bytesToPacket } from '../lib/utils'
import { Input } from './ui/Input'

export function NameProcessing() {
  const [name, setName] = useState('nick.eth')

  const normalizedName = useMemo(() => {
    try {
      return normalize(name)
    } catch (error) {
      return ''
    }
  }, [name])

  const label = normalizedName.split('.')[0]

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Name (string or DNS encoded)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={normalizedName === '' ? true : undefined}
      />

      {(() => {
        // Decode DNS name if it's a hex string
        if (isHex(name)) {
          return (
            <Input
              label="Decoded name"
              value={bytesToPacket(name)}
              disabled
              copyButton
            />
          )
        }

        // Show all name encodings
        return (
          <>
            {name !== normalizedName && !!normalizedName && (
              <Input
                label="Normalized name"
                value={`${normalizedName}`}
                disabled
                copyButton
              />
            )}

            <Input label="Label" value={label} disabled copyButton />

            <Input
              label="Labelhash"
              value={label ? keccak256(toHex(label)) : namehash('')}
              disabled
              copyButton
            />

            <Input
              label="Labelhash number"
              value={
                label
                  ? BigInt(keccak256(toHex(label))).toString()
                  : BigInt(namehash('')).toString()
              }
              disabled
              copyButton
            />

            <Input
              label="DNS Encode"
              value={toHex(packetToBytes(normalizedName))}
              disabled
              copyButton
            />

            <Input
              label="Namehash"
              value={namehash(normalizedName)}
              disabled
              copyButton
            />

            <Input
              label="Namehash number"
              value={BigInt(namehash(normalizedName)).toString()}
              disabled
              copyButton
            />
          </>
        )
      })()}
    </div>
  )
}
