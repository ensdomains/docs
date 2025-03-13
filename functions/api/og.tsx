import { ImageResponse } from '@cloudflare/pages-plugin-vercel-og/api'

export function onRequest({ request }: { request: Request }) {
  const params = new URL(request.url).searchParams
  const title = params.get('title')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 128,
          background: 'lavender',
        }}
      >
        {title ?? 'No Title'}
      </div>
    )
  )
}
