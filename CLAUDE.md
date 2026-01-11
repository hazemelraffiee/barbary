# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress documentation site for Islamic education services. The site is in Arabic with full RTL (right-to-left) support.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Architecture

- **VitePress site** with documentation in `docs/`
- **Configuration**: `docs/.vitepress/config.mts` - VitePress config with Arabic language settings and RTL direction
- **Custom theme**: `docs/.vitepress/theme/` - extends default VitePress theme with RTL CSS overrides
- **Content**: Markdown files in `docs/` directory (currently single-page site with `index.md`)

## RTL Support

The site uses comprehensive RTL styling in `docs/.vitepress/theme/custom.css`:
- Uses Noto Naskh Arabic font via Google Fonts
- Overrides VitePress default LTR styles for proper Arabic text display
- Applies RTL direction to navigation, content, tables, and lists
