import react from '@vitejs/plugin-react'
import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import * as vite from 'vite'
import { vocs } from 'vocs/vite'

declare global {
  // Waku's Cloudflare adapter uses a local preview server to emit pre-rendered
  // files. The Waku CLI installs this hook, but the Vocs CLI currently does not.
  // Keep this equivalent to Waku's build setup until Vocs handles it upstream.
  // eslint-disable-next-line no-var
  var __WAKU_START_PREVIEW_SERVER__:
    | (() => Promise<{
        baseUrl: string
        middlewares: {
          use: (handler: vite.Connect.NextHandleFunction) => void
        }
        close: () => Promise<void>
      }>)
    | undefined
}

const plugins = () => [react(), vocs()]

globalThis.__WAKU_START_PREVIEW_SERVER__ = async () => {
  const server = await vite.preview({
    configFile: false,
    plugins: plugins(),
    preview: {
      host: '127.0.0.1',
      port: 0,
    },
  })

  return {
    baseUrl: server.resolvedUrls!.local[0]!,
    middlewares: {
      use: (handler) => server.middlewares.use(handler),
    },
    close: () => server.close(),
  }
}

const builder = await vite.createBuilder({
  configFile: false,
  plugins: plugins(),
  build: { outDir: 'dist' },
})

await builder.buildApp()

async function replaceInBuildFile(
  file: string,
  search: string,
  replacement: string
) {
  const source = await readFile(file, 'utf8')
  if (!source.includes(search))
    throw new Error(`Expected build output was not found in ${file}`)
  await writeFile(file, source.replace(search, replacement))
}

const serverAssets = 'dist/server/assets'
const serverFiles = await readdir(serverAssets)
const serverEntry = serverFiles.find((file) => file.startsWith('server-entry-'))
const rolldownRuntime = serverFiles.find((file) =>
  file.startsWith('rolldown-runtime-')
)

if (!serverEntry || !rolldownRuntime)
  throw new Error('Expected Waku server output was not generated')

// Vocs currently emits Node-specific import.meta helpers in its Waku bundle.
// Workers does not define import.meta.url/import.meta.dirname, so make the
// generated imports explicit before Wrangler bundles the Worker.
await replaceInBuildFile(
  `${serverAssets}/${rolldownRuntime}`,
  'createRequire(import.meta.url)',
  "createRequire('/worker/index.js')"
)

let configPatched = false
for (const file of serverFiles.filter((file) => file.startsWith('config-'))) {
  const path = `${serverAssets}/${file}`
  const source = await readFile(path, 'utf8')
  const patched = source.replace(
    'path.resolve(import.meta.dirname, "../vocs.config.js")',
    '"../vocs.config.js"'
  )
  if (patched !== source) {
    await writeFile(path, patched)
    configPatched = true
  }
}
if (!configPatched)
  throw new Error('Expected Vocs server config import was not generated')

// The Cloudflare adapter is configured for static pages, but Vocs still emits
// its Node SSR environment. It is not reachable in the Worker and would count
// against Cloudflare's compressed script-size limit if Wrangler uploaded it.
await replaceInBuildFile(
  `${serverAssets}/${serverEntry}`,
  'return import("../ssr/index.js");',
  'throw new Error("SSR is disabled for this static Worker build");'
)
await rm('dist/server/ssr', { recursive: true, force: true })
