import { CcipReadRouter } from '@ensdomains/ccip-read-router'
import { cors } from 'itty-router'

const { preflight, corsify } = cors()

const router = CcipReadRouter({
  before: [preflight],
  finally: [corsify],
})

router.add({
  type: 'function addr(bytes32 node) external view returns (address)',
  handle: async ([_node]) => {
    // Always return the same address (registry.ens.eth)
    return ['0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' as const]
  },
})

export async function onRequestPost({ request }: { request: Request }) {
  const body = await request.json()
  const res = await router.call(body)
  console.log({ body, res })
  return Response.json(res)
}
