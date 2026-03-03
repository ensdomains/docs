import type { Image, Root } from 'mdast'
import { visit } from 'unist-util-visit'

const IPFS_GATEWAY = 'https://ipfs.io'

// Remark plugin that rewrites ipfs:// image URLs to use an HTTPS gateway.
export function remarkIpfsGateway() {
  return (tree: Root) => {
    visit(tree, 'image', (node: Image) => {
      if (node.url.startsWith('ipfs://')) {
        const cid = node.url.slice('ipfs://'.length)
        node.url = `${IPFS_GATEWAY}/ipfs/${cid}`
      }
    })
  }
}
