import fs from 'fs/promises'
import path from 'path'
import { Plugin } from 'vite'
import { SidebarItem } from 'vocs'

// Generate a JSON file for each DAO proposal to be used in the sidebar
// Only runs once, no need for hot reloading
export async function daoProposalsSidebar(): Promise<Plugin> {
  const name = 'dao-proposals'

  return {
    name,
    resolveId(id) {
      if (id === name) return name
    },
    async buildStart() {
      const sidebar = new Array<SidebarItem & { number: number }>()
      const files = await fs.readdir(
        path.join(__dirname, '..', 'pages/dao/proposals')
      )

      for (const file of files) {
        const filenameParts = file.split('.')
        const filenameWithoutExtension = filenameParts.slice(0, -1).join('.')
        const isProposal = filenameWithoutExtension.match(/^[0-9.]+$/)
        if (!isProposal) continue

        sidebar.push({
          text: `EP ${filenameWithoutExtension}`,
          link: `/dao/proposals/${filenameWithoutExtension}`,
          number: Number(filenameWithoutExtension),
        })
      }

      // TODO: Sort proposals. Consider that some proposals like 1.2.1 are not numbers so cannot be sorted numerically.
      const sortedSidebar = sidebar

      // Save sidebar file as JSON
      await fs.writeFile(
        'src/data/dao-proposals-sidebar.json',
        JSON.stringify(sortedSidebar, null, 2)
      )
    },
  }
}
