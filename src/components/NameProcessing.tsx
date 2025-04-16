import { useMemo, useState } from 'react'
import { keccak256, namehash, toHex } from 'viem'
import { normalize, packetToBytes } from 'viem/ens'

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
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={normalizedName === ''}
      />

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
        value={BigInt(keccak256(toHex(label))).toString()}
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
    </div>
  )
}
