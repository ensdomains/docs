import { CcipReadRouter } from '@ensdomains/ccip-read-router'

const router = CcipReadRouter()

router.add({
  type: 'function addr(bytes32 node) external view returns (address)',
  handle: ([_node]) => {
    // Always return the same address (registry.ens.eth)
    return ['0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' as const]
  },
})

export async function onRequestPost({ request }: { request: Request }) {
  const body = await request.json()
  const { body: ccipReadRes } = await router.call(body)
  const response = Response.json(ccipReadRes)
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}
