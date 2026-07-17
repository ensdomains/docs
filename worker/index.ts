import { onRequestPost as handlePlausibleEvent } from '../functions/api/blah/event'
import { onRequestGet as handlePlausibleScript } from '../functions/api/blah/script'
import { onRequestPost as handleBasicGateway } from '../functions/api/example/basic-gateway'
import { onRequest as handleOpenGraphImage } from '../functions/api/og'

const methodNotAllowed = (allowedMethods: string[]) =>
  new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: allowedMethods.join(', ') },
  })

const handleRequest = (request: Request) => {
  const { pathname } = new URL(request.url)

  if (pathname === '/api/blah/event') {
    if (request.method !== 'POST') return methodNotAllowed(['POST'])
    return handlePlausibleEvent({ request })
  }

  if (pathname === '/api/blah/script') {
    if (request.method !== 'GET') return methodNotAllowed(['GET'])
    return handlePlausibleScript()
  }

  if (pathname === '/api/example/basic-gateway') {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }
    if (request.method !== 'POST') {
      return methodNotAllowed(['POST', 'OPTIONS'])
    }
    return handleBasicGateway({ request })
  }

  if (pathname === '/api/og') return handleOpenGraphImage({ request })

  return new Response('Not Found', { status: 404 })
}

export default {
  fetch: handleRequest,
} satisfies ExportedHandler<Env>
