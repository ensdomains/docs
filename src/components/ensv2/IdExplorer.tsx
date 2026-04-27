import { useMemo, useState } from 'react'
import { keccak256, toHex } from 'viem'

import { Input } from '../ui/Input'

function SplitId({
  label,
  upper,
  lower,
  lowerLabel,
}: {
  label: string
  upper: string
  lower: string
  lowerLabel: string
}) {
  const full = `0x${upper}${lower}`
  return (
    <div className="flex flex-col gap-1">
      <label className="text-grey px-2 leading-none font-semibold">{label}</label>
      <div className="flex gap-1 items-center">
        <div className="flex-1 min-w-0">
          <input
            className="border-border disabled:bg-grey-light disabled:text-grey z-0 w-full rounded-md border px-3 py-2.5 leading-none font-mono text-xs font-normal outline-none truncate"
            value={`0x${upper}...`}
            disabled
            title="Upper 224 bits (from labelhash)"
          />
        </div>
        <div className="w-[120px] shrink-0">
          <input
            className="border-border disabled:bg-grey-light z-0 w-full rounded-md border px-3 py-2.5 leading-none font-mono text-xs font-bold outline-none text-[var(--vocs-color_textAccent)]"
            value={lower}
            disabled
            title={lowerLabel}
          />
        </div>
        <button
          className="!bg-background text-text-secondary hover:text-text border-border rounded border p-1.5 text-xs leading-none transition shrink-0"
          onClick={async () => {
            await navigator.clipboard.writeText(full)
          }}
          title="Copy full value"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
      </div>
      <div className="flex gap-1 px-2">
        <span className="flex-1 text-xs text-grey truncate">upper 224 bits (labelhash)</span>
        <span className="w-[120px] shrink-0 text-xs text-grey">{lowerLabel}</span>
        <span className="w-[28px] shrink-0" />
      </div>
    </div>
  )
}

export function IdExplorer() {
  const [label, setLabel] = useState('alice')
  const [eacVersionId, setEacVersionId] = useState(0)
  const [tokenVersionId, setTokenVersionId] = useState(0)

  const computed = useMemo(() => {
    if (!label) return null
    try {
      const labelhashHex = keccak256(toHex(label))
      const labelhashBigInt = BigInt(labelhashHex)

      // Canonical ID: zero the lower 32 bits
      const canonicalId = labelhashBigInt ^ (labelhashBigInt & 0xFFFFFFFFn)

      // Token ID: canonical ID | tokenVersionId
      const tokenId = canonicalId | BigInt(tokenVersionId)

      // Resource: canonical ID | eacVersionId
      const resource = canonicalId | BigInt(eacVersionId)

      // Split into upper (56 hex = 224 bits) and lower (8 hex = 32 bits)
      const fullLabelhash = labelhashHex.slice(2).padStart(64, '0')
      const upperHex = fullLabelhash.slice(0, 56)

      const canonicalLower = '00000000'
      const tokenLower = BigInt(tokenVersionId).toString(16).padStart(8, '0')
      const resourceLower = BigInt(eacVersionId).toString(16).padStart(8, '0')

      return {
        labelhash: labelhashHex,
        labelhashLower: fullLabelhash.slice(56),
        upperHex,
        canonicalLower,
        tokenLower,
        resourceLower,
      }
    } catch {
      return null
    }
  }, [label, eacVersionId, tokenVersionId])

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="alice"
      />

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-grey px-2 leading-none font-semibold text-sm">
            tokenVersionId: {tokenVersionId}
          </label>
          <input
            type="range"
            min={0}
            max={10}
            value={tokenVersionId}
            onChange={(e) => setTokenVersionId(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>
        <div className="flex-1">
          <label className="text-grey px-2 leading-none font-semibold text-sm">
            eacVersionId: {eacVersionId}
          </label>
          <input
            type="range"
            min={0}
            max={10}
            value={eacVersionId}
            onChange={(e) => setEacVersionId(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      </div>

      {computed && (
        <>
          <SplitId
            label="Labelhash"
            upper={computed.upperHex}
            lower={computed.labelhashLower}
            lowerLabel="lower 32 bits"
          />
          <SplitId
            label="Canonical ID"
            upper={computed.upperHex}
            lower={computed.canonicalLower}
            lowerLabel="zeroed"
          />
          <SplitId
            label="Token ID"
            upper={computed.upperHex}
            lower={computed.tokenLower}
            lowerLabel="tokenVersionId"
          />
          <SplitId
            label="Resource"
            upper={computed.upperHex}
            lower={computed.resourceLower}
            lowerLabel="eacVersionId"
          />
        </>
      )}
    </div>
  )
}
