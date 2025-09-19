import fs from 'fs/promises'
import path from 'path'
import { SidebarItem } from 'vocs'

// Generate a JSON file for each DAO proposal to be used in the sidebar
export async function daoProposalsSidebar() {
  const sidebar = new Array<SidebarItem>()
  const files = await fs.readdir(
    path.join(__dirname, '..', 'src/pages/dao/proposals')
  )

  const terms = new Set<number>()
  const parsedFiles = new Array<{
    filename: string
    term: number
    proposal: number
  }>()

  for (const file of files) {
    const filenameParts = file.split('.').slice(0, -1)
    const filenameWithoutExtension = filenameParts.join('.')
    const isProposal = filenameWithoutExtension.match(/^[0-9.]+$/)
    if (!isProposal) continue

    // filenameParts is like ['1', '2'] or ['1', '2', '1'] where the first part is the term and the rest is the proposal number
    const term = Number(filenameParts[0])
    const proposal = Number(filenameParts.slice(1).join('.'))

    terms.add(term)
    parsedFiles.push({ filename: filenameWithoutExtension, term, proposal })
  }

  const reversedTerms = Array.from(terms).reverse()
  for (const term of reversedTerms) {
    sidebar.push({
      text: `Proposals - Term ${term}`,
      items: parsedFiles
        .filter(({ term: t }) => t === term)
        .sort((a, b) => b.proposal - a.proposal)
        .map(({ filename }) => ({
          text: `EP ${filename}`,
          link: `/dao/proposals/${filename}`,
        })),
    })
  }

  // Save sidebar file as JSON
  await fs.writeFile(
    path.join(__dirname, '..', 'src/data/generated/dao-proposals-sidebar.json'),
    JSON.stringify(sidebar, null, 2)
  )
}
