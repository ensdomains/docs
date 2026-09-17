import { useMemo, useState } from 'react'
import { encodeAbiParameters, isHex, keccak256, toHex } from 'viem'

import { Input } from '../ui/Input'

// Resource computation copied from contracts-v2 source code:
// contracts/src/resolver/libraries/PermissionedResolverLib.sol
//   resource(string s)  = keccak256(bytes(s))
//   resource(uint256 x) = keccak256(abi.encodePacked(x))  (32-byte word)
//   resource(bytes4 x)  = keccak256(abi.encodePacked(x))  (4 bytes)

type ArgumentType = 'text' | 'data' | 'coinType' | 'contentType' | 'interfaceId'

const ROLE_BY_TYPE: Record<ArgumentType, string> = {
  text: 'ROLE_SET_TEXT',
  data: 'ROLE_SET_DATA',
  coinType: 'ROLE_SET_ADDRESS',
  contentType: 'ROLE_SET_ABI',
  interfaceId: 'ROLE_SET_INTERFACE',
}

export function ResourceCalculator() {
  const [argType, setArgType] = useState<ArgumentType>('text')
  const [key, setKey] = useState('avatar')
  const [coinType, setCoinType] = useState('60')
  const [contentType, setContentType] = useState('1')
  const [interfaceId, setInterfaceId] = useState('0x3b3b57de')

  const computed = useMemo(() => {
    try {
      let resource: `0x${string}`
      let argLabel: string

      if (argType === 'text' || argType === 'data') {
        // resource(key) = keccak256(bytes(key))
        resource = keccak256(toHex(key))
        argLabel = `keccak256(bytes("${key}"))`
      } else if (argType === 'coinType' || argType === 'contentType') {
        // resource(uint256) = keccak256 of the 32-byte word
        const raw = argType === 'coinType' ? coinType : contentType
        const value = BigInt(raw || '0')
        resource = keccak256(
          encodeAbiParameters([{ type: 'uint256' }], [value])
        )
        argLabel = `keccak256(abi.encodePacked(uint256(${raw})))`
      } else {
        // resource(interfaceId) = keccak256 of exactly 4 bytes
        if (!isHex(interfaceId) || interfaceId.length !== 10) return null
        resource = keccak256(interfaceId)
        argLabel = `keccak256(abi.encodePacked(bytes4(${interfaceId})))`
      }

      return { resource, argLabel, role: ROLE_BY_TYPE[argType] }
    } catch {
      return null
    }
  }, [argType, key, coinType, contentType, interfaceId])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-grey px-2 leading-none font-semibold">
          Setter argument
        </label>
        <div className="flex gap-2 px-2">
          {(
            ['text', 'data', 'coinType', 'contentType', 'interfaceId'] as const
          ).map((type) => (
            <button
              key={type}
              onClick={() => setArgType(type)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                argType === type
                  ? 'border-[var(--vocs-color_borderAccent)] bg-[var(--vocs-color_borderAccent)] text-white'
                  : 'border-border hover:border-[var(--vocs-color_borderAccent)]'
              }`}
            >
              {type === 'text'
                ? 'Text key'
                : type === 'data'
                  ? 'Data key'
                  : type === 'coinType'
                    ? 'Coin type'
                    : type === 'contentType'
                      ? 'Content type'
                      : 'Interface ID'}
            </button>
          ))}
        </div>
      </div>

      {(argType === 'text' || argType === 'data') && (
        <Input
          label={argType === 'text' ? 'Text key' : 'Data key'}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="avatar"
        />
      )}

      {argType === 'coinType' && (
        <Input
          label="Coin type"
          value={coinType}
          onChange={(e) => setCoinType(e.target.value)}
          placeholder="60"
        />
      )}

      {argType === 'contentType' && (
        <Input
          label="ABI content type"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          placeholder="1"
        />
      )}

      {argType === 'interfaceId' && (
        <Input
          label="Interface ID (bytes4)"
          value={interfaceId}
          onChange={(e) => setInterfaceId(e.target.value)}
          placeholder="0x3b3b57de"
        />
      )}

      {computed && (
        <>
          <Input
            label={`resource (${computed.argLabel})`}
            value={computed.resource}
            disabled
            copyButton
          />
          <Input
            label="Role checked at this resource"
            value={computed.role}
            disabled
            copyButton
          />
        </>
      )}
    </div>
  )
}
