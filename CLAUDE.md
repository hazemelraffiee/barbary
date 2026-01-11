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

---

## VitePress Agent Instructions

**IMPORTANT**: Before implementing any new feature, major edit, or architectural change to this VitePress site, you MUST first read the comprehensive guide at:

```
docs/vitepress-ultimate-guide.md
```

### When to Consult the Guide

Always read the guide BEFORE:
- Adding new features (search, PWA, i18n, etc.)
- Modifying theme or styles
- Adding Vue components to Markdown
- Configuring SEO, meta tags, or sitemap
- Setting up build hooks
- Adding plugins
- Optimizing performance
- Configuring deployment

### Guide Reference Summary

The guide (`docs/vitepress-ultimate-guide.md`) contains best practices for:

| Section | Topics Covered |
|---------|----------------|
| **Core Capabilities** | What VitePress can/cannot do, performance features |
| **Limitations** | Known constraints (1000+ files, no plugin system, static-only) |
| **Markdown Extensions** | Code blocks, syntax highlighting, containers, line annotations |
| **Vue in Markdown** | Component imports, SSR compatibility, `<ClientOnly>`, styling |
| **Theme Customization** | CSS variables, fonts, layout slots, component overrides |
| **SEO** | Meta tags, Open Graph, sitemap, structured data (JSON-LD) |
| **Performance** | Dev optimization, caching, code splitting, image lazy loading |
| **Search** | Local search config, Algolia DocSearch setup |
| **i18n & RTL** | Multi-language setup, RTL configuration, PostCSS plugins |
| **PWA** | @vite-pwa/vitepress setup, offline support, service workers |
| **Image Optimization** | vite-imagetools, responsive images, lazy loading |
| **Data Loading** | createContentLoader, dynamic routes, remote data fetching |
| **Build Hooks** | transformHead, transformPageData, transformHtml, buildEnd |
| **Deployment** | GitHub Pages, Cloudflare, Netlify, Vercel configurations |
| **Plugins** | Recommended plugins for search, SEO, images, i18n |

### Implementation Workflow

1. **Read the relevant section** from `docs/vitepress-ultimate-guide.md`
2. **Check for existing patterns** in `docs/.vitepress/config.mts` and `docs/.vitepress/theme/`
3. **Follow VitePress conventions** as documented in the guide
4. **Maintain RTL compatibility** for all new features (this is an Arabic site)
5. **Test with `npm run dev`** before considering complete

### Key Files to Check

| File | Purpose |
|------|---------|
| `docs/.vitepress/config.mts` | Main VitePress configuration |
| `docs/.vitepress/theme/index.js` | Theme entry point |
| `docs/.vitepress/theme/custom.css` | Custom styles & RTL overrides |
| `docs/vitepress-ultimate-guide.md` | **Comprehensive VitePress reference** |

### RTL-Specific Considerations

Since this is an Arabic RTL site, when adding features:
- Ensure CSS respects `dir="rtl"` attribute
- Use logical properties (`padding-inline-start` vs `padding-left`) when possible
- Test all UI components in RTL mode
- Check the i18n & RTL section of the guide for PostCSS RTL plugins
