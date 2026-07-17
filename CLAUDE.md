# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official ENS documentation site ([docs.ens.domains](https://docs.ens.domains)), built with [Vocs](https://vocs.dev/) and deployed to Cloudflare Workers with Static Assets.

## Commands

```bash
# Install dependencies
bun install

# Start development server (generates content first, then serves)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Preview the complete Worker and static-assets deployment
bun run worker:dev

# Regenerate Cloudflare binding and runtime types
bun run worker:types

# Build and deploy to Cloudflare Workers
bun run deploy

# Regenerate external content only
bun run generate

# Format code
bunx prettier --write .
```

**Requirements:** Bun 1.2.8+, Node 22+, and a paid Cloudflare Workers plan for deployment

## Architecture

### Content Generation (`scripts/`)

External content is fetched at build time via `bun run generate`:

- **ensips.ts**: Fetches ENSIPs from [ensdomains/ensips](https://github.com/ensdomains/ensips), converts to MDX, generates sidebar JSON
- **deployments.ts**: Fetches contract addresses from [ensdomains/ens-contracts](https://github.com/ensdomains/ens-contracts) staging branch
- **dao-proposals.ts**: Scans local `src/pages/dao/proposals/` for proposal files (named like `1.2.mdx` for Term 1, Proposal 2)

Generated files go to `src/data/generated/` and `src/pages/ensip/`. These are cached locally—delete them to re-fetch.

### Documentation Structure

- **`src/pages/`**: MDX documentation content organized by topic (contracts, dao, resolvers, web, wrapper, etc.)
- **`src/components/`**: React components used in MDX files (e.g., `ContractDeployments.tsx`, `Libraries.tsx`)
- **`src/data/`**: Static data files and generated JSON from build scripts

### Configuration

- **`vocs.config.ts`**: Main Vocs config with sidebar structure, theme, and edit links
- **`public/`**: Static assets plus Cloudflare `_headers` and `_redirects`
- **`src/waku.server.tsx`**: Vocs/Waku server entrypoint using the Cloudflare adapter
- **`src/pages/_api/`**: Vocs-native API routes for OG image generation, the CCIP-Read example, and analytics proxying

### Code Style

Uses Prettier with:

- No semicolons
- Single quotes
- 2-space indentation
- Import sorting (third-party → @/ → relative)
