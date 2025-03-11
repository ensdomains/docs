// This is not currently being used
import { FC, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { isAddress } from 'viem'
import { useEnsAddress, useEnsAvatar } from 'wagmi'

import { Button } from './ui/Button'

export const SendTransactionDemo: FC = () => {
  const [input, setInput] = useState('')

  const [debouncedInput] = useDebounce(input, 500)

  // Resolve potential ENS names (dot separated strings)
  const { data: ensAddress } = useEnsAddress({
    name: debouncedInput.includes('.') ? debouncedInput : undefined,
    chainId: 1,
  })
  const { data: ensAvatar } = useEnsAvatar({
    name: debouncedInput.includes('.') ? debouncedInput : undefined,
    chainId: 1,
  })

  // Set the address (address if provided directly or resolved address from ENS name)
  const address =
    input !== debouncedInput
      ? undefined
      : isAddress(debouncedInput)
        ? debouncedInput
        : ensAddress

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="input" className="text-base font-semibold">
        Address or ENS Name
      </label>
      <input
        id="input"
        className="border-grey w-full rounded-md border px-3 py-2"
        placeholder="ens.eth"
        onChange={(event) => setInput(event.target.value)}
      />

      {ensAddress && address && (
        <div className="flex items-center gap-2">
          {ensAvatar && (
            <div className="size-4">
              <img
                src={ensAvatar}
                alt="Avatar"
                className="size-full rounded-full object-cover"
              />
            </div>
          )}
          <span>{address}</span>
        </div>
      )}

      <Button variant="primary" onClick={() => {}} disabled={!address}>
        Send ETH
      </Button>
    </div>
  )
}
