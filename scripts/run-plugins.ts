import { daoProposalsSidebar } from '../src/plugins/dao-proposals'
import { deployments } from '../src/plugins/deployments'
import { ensips } from '../src/plugins/ensips'

const plugins = [ensips, deployments, daoProposalsSidebar]

for (const plugin of plugins) {
  await plugin()
}
