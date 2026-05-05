import { useMemo, useState } from 'react'
import { keccak256, namehash, encodeAbiParameters, toHex } from 'viem'
import { packetToBytes } from 'viem/ens'

import { Input } from '../ui/Input'

type RecordType = 'name' | 'text' | 'addr'

export function ResourceCalculator() {
  const [name, setName] = useState('alice.eth')
  const [recordType, setRecordType] = useState<RecordType>('text')
  const [textKey, setTextKey] = useState('avatar')
  const [coinType, setCoinType] = useState('60')

  const computed = useMemo(() => {
    if (!name) return null
    try {
      const node = namehash(name)

      let part: `0x${string}`
      let partLabel: string
      let authorizeFunction: string
      let authorizeArgs: string

      const dnsName = toHex(packetToBytes(name))

      if (recordType === 'name') {
        part = '0x0000000000000000000000000000000000000000000000000000000000000000'
        partLabel = 'bytes32(0) (name-level)'
        authorizeFunction = 'authorizeNameRoles'
        authorizeArgs = `(${dnsName}, roleBitmap, account, true)`
      } else if (recordType === 'text') {
        // partHash(key) = keccak256(bytes(key))
        part = keccak256(toHex(textKey))
        partLabel = `partHash("${textKey}") = keccak256(bytes("${textKey}"))`
        authorizeFunction = 'authorizeTextRoles'
        authorizeArgs = `(${dnsName}, "${textKey}", account, true)`
      } else {
        // partHash(coinType) = keccak256(abi.encode(coinType))
        const coinTypeNum = BigInt(coinType || '0')
        part = keccak256(
          encodeAbiParameters([{ type: 'uint256' }], [coinTypeNum])
        )
        partLabel = `partHash(${coinType}) = keccak256(abi.encode(${coinType}))`
        authorizeFunction = 'authorizeAddrRoles'
        authorizeArgs = `(${dnsName}, ${coinType}, account, true)`
      }

      // resource = keccak256(node, part)
      // Special case: resource(0, 0) = ROOT_RESOURCE = 0
      let resource: string
      if (node === '0x0000000000000000000000000000000000000000000000000000000000000000' &&
          part === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        resource = '0x0000000000000000000000000000000000000000000000000000000000000000'
      } else {
        resource = keccak256(
          encodeAbiParameters(
            [{ type: 'bytes32' }, { type: 'bytes32' }],
            [node, part]
          )
        )
      }

      return {
        node,
        part,
        partLabel,
        resource,
        authorizeFunction,
        authorizeArgs,
        dnsName,
      }
    } catch {
      return null
    }
  }, [name, recordType, textKey, coinType])

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="alice.eth"
      />

      <div className="flex flex-col gap-2">
        <label className="text-grey px-2 leading-none font-semibold">
          Scope
        </label>
        <div className="flex gap-2 px-2">
          {(['name', 'text', 'addr'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setRecordType(type)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                recordType === type
                  ? 'border-[var(--vocs-color_borderAccent)] bg-[var(--vocs-color_borderAccent)] text-white'
                  : 'border-border hover:border-[var(--vocs-color_borderAccent)]'
              }`}
            >
              {type === 'name' ? 'Name-level' : type === 'text' ? 'Text key' : 'Coin type'}
            </button>
          ))}
        </div>
      </div>

      {recordType === 'text' && (
        <Input
          label="Text key"
          value={textKey}
          onChange={(e) => setTextKey(e.target.value)}
          placeholder="avatar"
        />
      )}

      {recordType === 'addr' && (
        <Input
          label="Coin type"
          value={coinType}
          onChange={(e) => setCoinType(e.target.value)}
          placeholder="60"
        />
      )}

      {computed && (
        <>
          <Input label="node (namehash)" value={computed.node} disabled copyButton />
          <Input label={`part (${computed.partLabel})`} value={computed.part} disabled copyButton />
          <Input label="resource = keccak256(node, part)" value={computed.resource} disabled copyButton />
          <Input
            label={`To grant: ${computed.authorizeFunction}`}
            value={computed.authorizeArgs}
            disabled
            copyButton
          />
        </>
      )}
    </div>
  )
}
