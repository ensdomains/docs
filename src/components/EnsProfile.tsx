import { truncateAddress } from '../lib/utils'

type Props = {
  name: string
  address: `0x${string}`
}

export function EnsProfile({ name, address }: Props) {
  return (
    <div className="w-fit bg-white rounded-full shadow-sm p-1 pr-6 border border-grey-light flex items-center justify-center">
      <div className="flex items-center gap-2">
        <img
          src={`https://metadata.ens.domains/mainnet/avatar/${name}`}
          className="w-10 h-10 rounded-full border border-grey-light"
        />
        <div className="flex flex-col leading-none">
          <span className="font-semibold">{name}</span>
          <span className="text-sm font-medium text-grey">
            {truncateAddress(address)}
          </span>
        </div>
      </div>
    </div>
  )
}
