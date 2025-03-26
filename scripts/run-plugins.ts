import { daoProposalsSidebar } from './dao-proposals'
import { deployments } from './deployments'
import { ensips } from './ensips'

const plugins = [ensips, deployments, daoProposalsSidebar]

for (const plugin of plugins) {
  await plugin()
}
