# ENS Documentation

This repository contains the source code for [docs.ens.domains](https://docs.ens.domains/?ref=ens-docs-github), as well as the markdown files that make up its contents. It's built with [Vocs](https://vocs.dev/) and deployed to [Cloudflare Workers](https://workers.cloudflare.com/) with Static Assets.

Some content is generated at build time from external sources, such as [ENSIPs](https://github.com/ensdomains/ensips) and [smart contract deployments](https://github.com/ensdomains/ens-contracts). This logic can be found in the `scripts/` directory.

A Cloudflare Worker runs Vocs' Waku server for native API routes, including opengraph images and analytics proxying. Documentation pages are pre-rendered and served directly by Workers Static Assets.

The Vocs/Waku runtime is larger than the 3 MiB compressed Worker limit on Cloudflare's free plan, so production deployment requires a paid Workers plan. `bun run deploy` builds the site and deploys the generated Worker.

## 📖 Contributing

We welcome contributions to the ENS documentation. If you would like to contribute, please read the [contributing guidelines](./CONTRIBUTING.md). All content is written in mdx, and [markdown files can be found here](./src/pages/).

## 📄 License

Please check the license information from the [LICENSE](./LICENSE) file.
