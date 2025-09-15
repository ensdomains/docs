import { useLocalStorage } from 'usehooks-ts'

import { Button } from './components/ui/Button'

export default function Footer() {
  const [selectedResponse, setSelectedResponse] = usePageFeedback()

  const isYesSelected = selectedResponse === 'yes'
  const isNoSelected = selectedResponse === 'no'

  // Don't show the footer on the home page
  if (typeof window !== 'undefined' && window.location.pathname === '/')
    return null

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
            // Don't track if the user has already selected this response
            if (isYesSelected) return

            setSelectedResponse('yes')
            ;(window as any).plausible?.('Page Useful', {
              props: { response: 'yes' },
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
            // Don't track if the user has already selected this response
            if (isNoSelected) return

            setSelectedResponse('no')
            ;(window as any).plausible?.('Page Useful', {
              props: { response: 'no' },
            })
          }}
        >
          No
        </Button>
      </div>
    </div>
  )
}

type FeedbackResponse = 'yes' | 'no'
type FeedbackMap = Record<string, FeedbackResponse>

function usePageFeedback() {
  const [map, setMap] = useLocalStorage<FeedbackMap>(
    'ensdocs:page-feedback',
    {}
  )

  const urlKey = typeof window !== 'undefined' ? window.location.pathname : ''

  const selectedResponse = (map[urlKey] ?? null) as FeedbackResponse | null

  const setSelectedResponse = (response: FeedbackResponse | null) => {
    setMap((prev) => {
      const next = { ...(prev || {}) }
      if (response) next[urlKey] = response
      else delete next[urlKey]
      return next
    })
  }

  return [selectedResponse, setSelectedResponse] as const
}
