import { middlewareModules } from 'vocs/waku/middleware'
import { router } from 'vocs/waku/router'
import adapter from 'waku/adapters/cloudflare'

export default adapter(
  router(import.meta.glob('./pages/**/*.{js,ts,tsx,jsx,mjs,cjs,md,mdx}')),
  {
    static: true,
    middlewareModules: middlewareModules(
      import.meta.glob('./middleware/*.{js,ts,tsx,jsx,mjs,cjs,md,mdx}')
    ),
  }
)
