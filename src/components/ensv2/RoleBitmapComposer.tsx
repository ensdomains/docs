import { useMemo, useState } from 'react'

import { Input } from '../ui/Input'

// Role definitions copied verbatim from contracts-v2 source code.
// Each value is the exact bigint equivalent of the Solidity constant.

// From: contracts/src/registry/libraries/RegistryRolesLib.sol
const REGISTRY_ROLES = [
  // Regular roles (lower 128 bits)
  { name: 'ROLE_REGISTRAR', value: 1n << 0n },                             // Nybble 0
  { name: 'ROLE_REGISTER_RESERVED', value: 1n << 4n },                     // Nybble 1
  { name: 'ROLE_SET_PARENT', value: 1n << 8n },                            // Nybble 2
  { name: 'ROLE_UNREGISTER', value: 1n << 12n },                           // Nybble 3
  { name: 'ROLE_RENEW', value: 1n << 16n },                                // Nybble 4
  { name: 'ROLE_SET_SUBREGISTRY', value: 1n << 20n },                      // Nybble 5
  { name: 'ROLE_SET_RESOLVER', value: 1n << 24n },                         // Nybble 6
  { name: 'ROLE_UPGRADE', value: 1n << 124n },                             // Nybble 31
  // Admin roles (upper 128 bits)
  { name: 'ROLE_REGISTRAR_ADMIN', value: (1n << 0n) << 128n },             // Nybble 32
  { name: 'ROLE_REGISTER_RESERVED_ADMIN', value: (1n << 4n) << 128n },     // Nybble 33
  { name: 'ROLE_SET_PARENT_ADMIN', value: (1n << 8n) << 128n },            // Nybble 34
  { name: 'ROLE_UNREGISTER_ADMIN', value: (1n << 12n) << 128n },           // Nybble 35
  { name: 'ROLE_RENEW_ADMIN', value: (1n << 16n) << 128n },                // Nybble 36
  { name: 'ROLE_SET_SUBREGISTRY_ADMIN', value: (1n << 20n) << 128n },      // Nybble 37
  { name: 'ROLE_SET_RESOLVER_ADMIN', value: (1n << 24n) << 128n },         // Nybble 38
  { name: 'ROLE_CAN_TRANSFER_ADMIN', value: (1n << 28n) << 128n },         // Nybble 39 (admin-only, no regular variant)
  { name: 'ROLE_UPGRADE_ADMIN', value: (1n << 124n) << 128n },             // Nybble 63
] as const

// From: contracts/src/resolver/libraries/PermissionedResolverLib.sol
const RESOLVER_ROLES = [
  // Regular roles (lower 128 bits)
  { name: 'ROLE_SET_ADDR', value: 1n << 0n },                              // Nybble 0
  { name: 'ROLE_SET_TEXT', value: 1n << 4n },                               // Nybble 1
  { name: 'ROLE_SET_CONTENTHASH', value: 1n << 8n },                       // Nybble 2
  { name: 'ROLE_SET_PUBKEY', value: 1n << 12n },                           // Nybble 3
  { name: 'ROLE_SET_ABI', value: 1n << 16n },                              // Nybble 4
  { name: 'ROLE_SET_INTERFACE', value: 1n << 20n },                        // Nybble 5
  { name: 'ROLE_SET_NAME', value: 1n << 24n },                             // Nybble 6
  { name: 'ROLE_SET_ALIAS', value: 1n << 28n },                            // Nybble 7
  { name: 'ROLE_CLEAR', value: 1n << 32n },                                // Nybble 8
  { name: 'ROLE_SET_DATA', value: 1n << 36n },                             // Nybble 9
  { name: 'ROLE_UPGRADE', value: 1n << 124n },                             // Nybble 31
  // Admin roles (upper 128 bits)
  { name: 'ROLE_SET_ADDR_ADMIN', value: (1n << 0n) << 128n },              // Nybble 32
  { name: 'ROLE_SET_TEXT_ADMIN', value: (1n << 4n) << 128n },              // Nybble 33
  { name: 'ROLE_SET_CONTENTHASH_ADMIN', value: (1n << 8n) << 128n },      // Nybble 34
  { name: 'ROLE_SET_PUBKEY_ADMIN', value: (1n << 12n) << 128n },          // Nybble 35
  { name: 'ROLE_SET_ABI_ADMIN', value: (1n << 16n) << 128n },             // Nybble 36
  { name: 'ROLE_SET_INTERFACE_ADMIN', value: (1n << 20n) << 128n },       // Nybble 37
  { name: 'ROLE_SET_NAME_ADMIN', value: (1n << 24n) << 128n },            // Nybble 38
  { name: 'ROLE_SET_ALIAS_ADMIN', value: (1n << 28n) << 128n },           // Nybble 39
  { name: 'ROLE_CLEAR_ADMIN', value: (1n << 32n) << 128n },               // Nybble 40
  { name: 'ROLE_SET_DATA_ADMIN', value: (1n << 36n) << 128n },            // Nybble 41
  { name: 'ROLE_UPGRADE_ADMIN', value: (1n << 124n) << 128n },            // Nybble 63
] as const

interface RoleBitmapComposerProps {
  contract: 'registry' | 'resolver'
}

export function RoleBitmapComposer({ contract }: RoleBitmapComposerProps) {
  const allRoles = contract === 'registry' ? REGISTRY_ROLES : RESOLVER_ROLES
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Split into regular and admin for display
  const regularRoles = allRoles.filter(r => !r.name.endsWith('_ADMIN'))
  const adminRoles = allRoles.filter(r => r.name.endsWith('_ADMIN'))

  // Computation: just OR together the selected role values
  const result = useMemo(() => {
    if (selected.size === 0) return null

    let bitmap = 0n
    const names: string[] = []

    for (const role of allRoles) {
      if (selected.has(role.name)) {
        bitmap = bitmap | role.value
        names.push(role.name)
      }
    }

    return {
      hex: '0x' + bitmap.toString(16).padStart(64, '0'),
      decimal: bitmap.toString(),
      solidity: names.join(' | '),
    }
  }, [selected, allRoles])

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-grey px-2 leading-none font-semibold">
          Regular roles
        </label>
        <div className="flex flex-wrap gap-2 px-2">
          {regularRoles.map((role) => (
            <button
              key={role.name}
              onClick={() => toggle(role.name)}
              className={`rounded-md border px-2.5 py-1 text-xs font-mono transition ${
                selected.has(role.name)
                  ? 'border-[var(--vocs-color_borderAccent)] bg-[var(--vocs-color_borderAccent)] text-white'
                  : 'border-border hover:border-[var(--vocs-color_borderAccent)]'
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-grey px-2 leading-none font-semibold">
          Admin roles
        </label>
        <div className="flex flex-wrap gap-2 px-2">
          {adminRoles.map((role) => (
            <button
              key={role.name}
              onClick={() => toggle(role.name)}
              className={`rounded-md border px-2.5 py-1 text-xs font-mono transition ${
                selected.has(role.name)
                  ? 'border-[var(--vocs-color_borderAccent)] bg-[var(--vocs-color_borderAccent)] text-white'
                  : 'border-border hover:border-[var(--vocs-color_borderAccent)]'
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <Input label="Bitmap (hex)" value={result.hex} disabled copyButton />
          <Input label="Bitmap (decimal)" value={result.decimal} disabled copyButton />
          <Input label="Solidity" value={result.solidity} disabled copyButton />
        </>
      )}
    </div>
  )
}
