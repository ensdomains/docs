# Design Patterns

This document captures high-signal UI conventions for the docs site so brand and implementation choices stay consistent.

## Core Tokens

- Use CSS custom properties in `src/styles.css` for global tokens.
- Prefer semantic token names (`--ens-*`) over hardcoded values in component styles.

## Buttons

- All button controls use a 4px corner radius.
- Source of truth: `--ens-radius-button` in `src/styles.css`.
- Applied to: `button`, `input[type='button']`, `input[type='submit']`, and `input[type='reset']`.

## Tables

- All documentation tables use `rounded-md` corners (6px).
- Source of truth: `--ens-radius-table` in `src/styles.css`.
- Applied to Vocs table wrappers/content to keep corners visibly clipped.

## Typography

- Primary sans serif: `ABCMonumentGrotesk`.
- Serif: `ABCMarist`.
- Monospace: `ABCMonumentGroteskMono` and `ABCMonumentGroteskSemiMono`.
- Keep `font-display: swap` for self-hosted font loading behavior.

## Color System

- Use `--ens-*` palette tokens and semantic aliases (`--ens-background`, `--ens-text`, etc.).
- Define both light (`:root`) and dark (`.dark`) token values in `src/styles.css`.
- Figma source of truth: [`ENS Core` color tokens](https://www.figma.com/design/2sH9SoYCbfma5clol8dFP4/%F0%9F%93%93--ENS-Core?node-id=514-12&p=f&t=TTwQnH0qKnppCExL-0) (node `514:12`).

### Figma Palette Extract (current)

- **Lapis**: `100 #DBF0F8`, `300 #80C4E0`, `400 #39B4EA`, `500 #0082BB`, `900 #02293B`
- **Quartz**: `100 #EEEDED`, `300 #C7C6C4`, `400 #737373`, `500 #595755`, `900 #191919`
- **Peridot**: `100 #D1EEDF`, `300 #65D388`, `400 #1CBF46`, `500 #007C20`, `900 #033010`
- **Garnet**: `100 #FEEAF0`, `300 #FFB0D0`, `400 #F569AB`, `500 #E72A96`, `900 #5A0024`
- **Citrine**: `100 #F8F7E2`, `300 #E1B77E`, `400 #E7A259`, `500 #984D1B`, `900 #441B03`

### Current Mapping Rule

- `--ens-blue-primary` maps to **Lapis 500** (`#0082BB`) and is the default accent blue used by Vocs theme variables.
