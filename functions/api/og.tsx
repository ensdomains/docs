export function onRequest({ request }: { request: Request }) {
  const params = new URL(request.url).searchParams
  const title = params.get('title')

  return Response.json({ title })
}
