# ENS Documentation

This repository contains the source code for [docs.ens.domains](https://docs.ens.domains/?ref=ens-docs-github), as well as the markdown files that make up its contents. It's built with [Vocs](https://vocs.dev/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

Some content is generated at build time from external sources, such as [ENSIPs](https://github.com/ensdomains/ensips) and [smart contract deployments](https://github.com/ensdomains/ens-contracts). Markdown generation is handled by Vite plugins located in the `src/plugins` directory.

Cloudflare [Pages Functions](https://developers.cloudflare.com/pages/functions/) are used to dynamically generate opengraph images for each page.

## 📖 Contributing

We welcome contributions to the ENS documentation. If you would like to contribute, please read the [contributing guidelines](./CONTRIBUTING.md). All content is written in mdx, and [markdown files can be found here](./src/pages/).

## 📄 License

Please check the license information from the [LICENSE](./LICENSE) file.
