import { CcipReadRouter } from '@ensdomains/ccip-read-router'

const router = CcipReadRouter()

router.add({
  type: 'function addr(bytes32 node) external view returns (address)',
  handle: ([_node]) => {
    // Always return the same address (registry.ens.eth)
    return ['0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' as const]
  },
})

router.add({
  type: 'function addr(bytes32 node, uint256 coinType) external view returns (bytes)',
  handle: ([_node, _coinType]) => {
    // Always return the same address (offchain.integration-tests.eth)
    // https://github.com/ensdomains/resolution-tests
    return ['0xeE9eeaAB0Bb7D9B969D701f6f8212609EDeA252E' as const]
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
