import { useState } from 'react'

import { Button } from './components/ui/Button'

export default function Footer() {
  const [selectedResponse, setSelectedResponse] = useState<'yes' | 'no' | null>(
    null
  )

  const isYesSelected = selectedResponse === 'yes'
  const isNoSelected = selectedResponse === 'no'

  return (
    <div className="hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between">
      <div className="text-base font-medium">
        Did you find this page useful?
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={isYesSelected ? 'success' : 'outline'}
          aria-label="Did you find this page useful? Yes"
          aria-pressed={isYesSelected}
          onClick={() => {
            setSelectedResponse('yes')
            ;(window as any).plausible?.('Page Useful', {
              props: { response: 'yes', url: window.location.href },
            })
          }}
        >
          Yes
        </Button>
        <Button
          variant={isNoSelected ? 'destructive' : 'outline'}
          aria-label="Did you find this page useful? No"
          aria-pressed={isNoSelected}
          onClick={() => {
            setSelectedResponse('no')
            ;(window as any).plausible?.('Page Useful', {
              props: { response: 'no', url: window.location.href },
            })
          }}
        >
          No
        </Button>
      </div>
    </div>
  )
}
