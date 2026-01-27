# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official ENS documentation site ([docs.ens.domains](https://docs.ens.domains)), built with [Vocs](https://vocs.dev/) and deployed to Cloudflare Pages.

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

# Regenerate external content only
bun run generate

# Format code
bunx prettier --write .
```

**Requirements:** Bun 1.2.8+, Node 22+

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

- **`vocs.config.tsx`**: Main Vocs config with sidebar structure, theme, and edit links
- **`functions/api/`**: Cloudflare Pages Functions for OG image generation and analytics proxy

### Code Style

Uses Prettier with:

- No semicolons
- Single quotes
- 2-space indentation
- Import sorting (third-party → @/ → relative)
