import fs from 'fs/promises'
import { Tokens, marked } from 'marked'
import path from 'path'
import { Plugin } from 'vite'
import { SidebarItem } from 'vocs'

type DirectoryContents = {
  name: string
  download_url: string
}[]

// Generate a markdown file for each ENSIP and add it to the sidebar
// Only runs once, no need for hot reloading
export async function ensips(): Promise<Plugin> {
  const name = 'ensips'

  return {
    name,
    resolveId(id) {
      if (id === name) return name
    },
    async buildStart() {
      const alreadyExists = await fs
        .access('src/pages/ensip/1.md')
        .then(() => true)
        .catch(() => false)

      if (alreadyExists) {
        return
      }

      console.log('Fetching ENSIPs')

      const res = await fetch(
        'https://api.github.com/repos/ensdomains/ensips/contents/ensips'
      )
      const files = (await res.json()) as DirectoryContents

      // Format files for the sidebar
      const sidebar = new Array<SidebarItem & { number: number }>()

      await Promise.all(
        files.map(async (file) => {
          const res = await fetch(file.download_url)
          const content = await res.text()
          const ensipNumber = file.name.split('.')[0]

          // Add to sidebar array
          sidebar.push({
            text: getTitle(content, ensipNumber),
            link: `/ensip/${ensipNumber}`,
            number: Number(ensipNumber),
          })

          // Save markdown file
          await fs.writeFile(
            path.join('src/pages/ensip', file.name),
            content,
            'utf-8'
          )
        })
      )

      // Save sidebar file as JSON
      await fs.writeFile(
        path.join('src/pages/ensip', 'sidebar.json'),
        JSON.stringify(
          sidebar.sort((a, b) => a.number - b.number),
          null,
          2
        )
      )

      console.log('Fetched ENSIPs and generated markdown files')
    },
  }
}

function getTitle(markdown: string, ensipNumber: string) {
  const tokens = marked.lexer(markdown)
  const firstHeading = tokens.find(
    (token) => token.type === 'heading' && token.depth === 1
  ) as Tokens.Heading | undefined

  return firstHeading?.text ?? ensipNumber
}
