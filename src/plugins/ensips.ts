import fs from 'fs/promises'
import matter from 'gray-matter'
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
        .access('src/pages/ensip/1.mdx')
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
      const sidebar = new Array<SidebarItem & { number: number }>()

      await Promise.all(
        files.map(async (file) => {
          const res = await fetch(file.download_url)
          const mdFile = await res.text()
          const parsedMd = matter(mdFile)
          const rawBody = parsedMd.content
          const rawFrontmatter = parsedMd.matter
          const ensipNumber = Number(file.name.split('.')[0])
          const titleLength = getFirstHeadingToken(mdFile)!.raw.length

          sidebar.push({
            text: getFirstHeadingToken(mdFile)!.text,
            link: `/ensip/${ensipNumber}`,
            number: ensipNumber,
          })

          const parsedFrontMatter = parsedMd.data as {
            contributors: string[]
            ensip: {
              status: 'draft' | 'final' | 'obsolete'
              created: Date
            }
          }

          const authors = parsedFrontMatter.contributors.map((c) => `"${c}"`)
          const created = parseDate(parsedFrontMatter.ensip.created)
          const injectedMarkdown = `<EnsipHeader authors={[${authors}]} created="${created}" status="${parsedFrontMatter.ensip.status}" />`

          // Reconstruct markdown file
          const modifiedMarkdown =
            '---' +
            rawFrontmatter +
            '\n---\n\n' +
            'import { EnsipHeader } from "../../components/EnsipHeader";\n' +
            rawBody.slice(0, titleLength) +
            injectedMarkdown +
            '\n' +
            replaceRelativeLinks(rawBody.slice(titleLength))

          // Save markdown file
          await fs.writeFile(
            path.join('src/pages/ensip', `${ensipNumber}.mdx`),
            modifiedMarkdown,
            'utf-8'
          )
        })
      )

      // Save sidebar file as JSON
      await fs.writeFile(
        'src/data/generated/ensips-sidebar.json',
        JSON.stringify(
          sidebar.sort((a, b) => a.number - b.number),
          null,
          2
        )
      )
    },
  }
}

function getFirstHeadingToken(description: string) {
  const tokens = marked.lexer(description)
  return tokens.find(
    (token) => token.type === 'heading' && token.depth === 1
  ) as Tokens.Heading | undefined
}

function parseDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

function replaceRelativeLinks(markdown: string) {
  // Regex for `./{number}.md` with `/ensip/{number}`
  const relativeEnsipLink = /\.\/(\d+)\.md/g
  return markdown.replace(relativeEnsipLink, `/ensip/$1`)
}
