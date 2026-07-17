import { daoProposalsSidebar } from './dao-proposals'
import { deployments } from './deployments'
import { ensips } from './ensips'
import { ensv2Deployments } from './ensv2-deployments'

const plugins = [ensips, deployments, ensv2Deployments, daoProposalsSidebar]

for (const plugin of plugins) {
  await plugin()
}
