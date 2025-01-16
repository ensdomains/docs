import { Address, zeroAddress } from 'viem'
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi'

import { cn, truncateAddress } from '../lib/utils'

type EnsProfileProps =
  | { name: string; address: undefined }
  | { address: Address; name: undefined }

export function EnsProfile({ name, address }: EnsProfileProps) {
  return name
    ? EnsProfileFromName({ name })
    : address
      ? EnsProfileFromAddress({ address })
      : null
}

function EnsProfileFromName({ name }: { name: string }) {
  const { data: address } = useEnsAddress({ name, chainId: 1 })
  return <Profile name={name} address={address} />
}

function EnsProfileFromAddress({ address }: { address: Address }) {
  const { data: name } = useEnsName({ address, chainId: 1 })
  return <Profile name={name} address={address} />
}

function Profile({
  name,
  address,
}: {
  name?: string | null
  address?: Address | null
}) {
  const { data: avatar } = useEnsAvatar({ name: name || undefined, chainId: 1 })

  return (
    <div className="flex w-fit items-center justify-center rounded-full border border-grey-light bg-white p-1 pr-6 shadow-sm">
      <div className="flex items-center gap-2">
        <img
          src={avatar || '/img/fallback-avatar.svg'}
          className="h-10 w-10 rounded-full border border-grey-light"
        />
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">{name || 'No name'}</span>

          <span className={cn('text-xs text-grey')}>
            {truncateAddress(address || zeroAddress)}
          </span>
        </div>
      </div>
    </div>
  )
}
