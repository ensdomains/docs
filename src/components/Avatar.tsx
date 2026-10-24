import { useEnsAvatar } from 'wagmi'

import { cn } from '../lib/utils'
import { ImageWithFallback } from './ui/ImageWithFallback'

type Properties = {
  name: string
  width: number
  rounded?: boolean
  className?: string
}

export function Avatar({ name, width, rounded, className }: Properties) {
  const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 })

  return (
    <ImageWithFallback
      src={ensAvatar ?? undefined}
      fallback="/img/fallback-avatar.svg"
      alt={name}
      width={width}
      height={width}
      className={cn(
        'aspect-square object-cover',
        rounded && 'rounded-full',
        className
      )}
    />
  )
}
