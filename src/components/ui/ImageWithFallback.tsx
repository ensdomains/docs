import { ImgHTMLAttributes } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fallback: string
}

// Swaps to `fallback` if `src` fails to load. The ref check catches failures
// that happened before hydration, when onError wasn't attached yet.
export function ImageWithFallback({ src, fallback, ...props }: Props) {
  const showFallback = (img: HTMLImageElement) => {
    if (img.getAttribute('src') !== fallback) img.src = fallback
  }

  return (
    <img
      src={src || fallback}
      ref={(img) => {
        if (img?.complete && img.naturalWidth === 0) showFallback(img)
      }}
      onError={(e) => showFallback(e.currentTarget)}
      {...props}
    />
  )
}
