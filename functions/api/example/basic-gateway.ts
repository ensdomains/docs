import { CcipReadRouter } from '@ensdomains/ccip-read-router'

const router = CcipReadRouter()

router.add({
  type: 'function addr(bytes32 node) external view returns (address)',
  handle: ([_node]) => {
    // Always return the ABI-encoded address for registry.ens.eth.
    return '0x00000000000000000000000000000000000c2e074ec69a0dfb2997ba6c7d2e1e'
  },
})

export async function onRequestPost({ request }: { request: Request }) {
  const body = (await request.json()) as Parameters<typeof router.call>[0]
  const { body: ccipReadRes } = await router.call(body)
  const response = Response.json(ccipReadRes)
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return response
}
