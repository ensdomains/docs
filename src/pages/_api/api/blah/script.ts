// Plausible Proxy
// https://plausible.io/docs/proxy/guides/cloudflare

const script = 'https://plausible.io/js/script.outbound-links.tagged-events.js'

export function GET() {
  return fetch(script)
}
