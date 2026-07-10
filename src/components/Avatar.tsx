import { useEnsAvatar } from 'wagmi'

import { cn } from '../lib/utils'

type Properties = {
  name: string
  width: number
  rounded?: boolean
}

export function Avatar({ name, width, rounded }: Properties) {
  const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 })

  return (
    <object
      data={ensAvatar ?? '/img/fallback-avatar.svg'}
      type="image/jpeg"
      width={width}
      height={width}
      className={cn('aspect-square object-cover', rounded && 'rounded-full')}
    >
      <img src="/fallback-avatar.svg" />
    </object>
  )
}
