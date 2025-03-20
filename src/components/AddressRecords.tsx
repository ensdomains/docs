import { useEnsAvatar } from 'wagmi'

import { UseEnsAddressesProps, useEnsAddresses } from '../hooks/useEnsAddresses'
import { Table } from './ui/Table'

export const AddressRecords = ({ name, coinTypes }: UseEnsAddressesProps) => {
  const { data: avatar } = useEnsAvatar({ name, chainId: 1 })
  const { data: addresses } = useEnsAddresses({ name, coinTypes })

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <img
          src={avatar || '/img/fallback-avatar.svg'}
          className="h-8 w-8 rounded"
        />
        <span className="font-semibold">{name}</span>
      </div>

      <Table
        columns={['CoinType', 'Address']}
        rows={
          addresses?.map(({ coinType, address }) => [coinType, address]) || []
        }
      />
    </>
  )
}
