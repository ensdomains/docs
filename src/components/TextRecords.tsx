import { useEnsAvatar } from 'wagmi'

import { UseEnsTextsProps, useEnsTexts } from '../hooks/useEnsTexts'
import { Table } from './ui/Table'

export const TextRecords = ({ name, keys }: UseEnsTextsProps) => {
  const { data: avatar } = useEnsAvatar({ name, chainId: 1 })
  const { data: texts } = useEnsTexts({ name, keys })

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
        columns={['Key', 'Value']}
        rows={texts?.map(({ key, value }) => [key, value]) || []}
      />
    </>
  )
}
