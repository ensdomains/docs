import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fallback: string
}

// Swaps to `fallback` if `src` fails to load, including failures that happen before hydration
export function ImageWithFallback({ src, fallback, ...props }: Props) {
  const ref = useRef<HTMLImageElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [src])

  useEffect(() => {
    const img = ref.current
    if (img?.complete && img.naturalWidth === 0) setFailed(true)
  }, [src])

  return (
    <img
      ref={ref}
      src={failed || !src ? fallback : src}
      onError={() => setFailed(true)}
      {...props}
    />
  )
}
