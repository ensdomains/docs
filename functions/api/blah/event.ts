// Plausible Proxy
// https://plausible.io/docs/proxy/guides/cloudflare

export function onRequestPost({ request }: { request: Request }) {
  request.headers.delete('cookie')
  return fetch('https://plausible.io/api/event', request)
}
