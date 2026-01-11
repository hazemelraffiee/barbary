# The Ultimate VitePress Guide: Capabilities, Best Practices & Tips

> A comprehensive guide to maximizing VitePress for static websites

---

## Table of Contents

1. [What is VitePress?](#what-is-vitepress)
2. [Core Capabilities](#core-capabilities)
3. [Limitations to Be Aware Of](#limitations-to-be-aware-of)
4. [Markdown Extensions](#markdown-extensions)
5. [Using Vue Components in Markdown](#using-vue-components-in-markdown)
6. [Theme Customization](#theme-customization)
7. [SEO Optimization](#seo-optimization)
8. [Performance Best Practices](#performance-best-practices)
9. [Search Implementation](#search-implementation)
10. [Internationalization & RTL](#internationalization--rtl)
11. [PWA & Offline Support](#pwa--offline-support)
12. [Image Optimization](#image-optimization)
13. [Data Loading & Dynamic Routes](#data-loading--dynamic-routes)
14. [Build Hooks](#build-hooks)
15. [Deployment](#deployment)
16. [Recommended Plugins](#recommended-plugins)
17. [Showcase & Inspiration](#showcase--inspiration)

---

## What is VitePress?

VitePress is a **Static Site Generator (SSG)** designed for building fast, content-centric websites. It's built on top of **Vite** and **Vue 3**.

### How It Works

1. Takes source content written in **Markdown**
2. Applies a **theme** to it
3. Generates **static HTML pages** that can be deployed anywhere

### The Hybrid Approach

Unlike traditional SSGs where each navigation results in a full page reload, VitePress:

- Serves **static HTML** on initial visit (great for SEO)
- Becomes a **Single Page Application (SPA)** for subsequent navigation
- Provides optimal balance between performance and user experience

---

## Core Capabilities

### Performance Features

| Feature | Description |
|---------|-------------|
| ⚡ Instant Server Start | Vite's fast dev server |
| 🔥 Hot Module Replacement | Changes reflected in <100ms |
| 📦 Optimized Bundles | Static content eliminated from JS payload |
| 🎯 Code Splitting | Components loaded only when needed |
| 🚀 Near-perfect PageSpeed | Typical scores even on low-end mobile devices |

### Developer Experience

- **Vue-Enhanced Markdown**: Each Markdown page is a Vue SFC
- **Vue 3 Syntax**: Use Vue features directly in Markdown
- **TypeScript Support**: Full TypeScript support out of the box
- **Vite Plugin Ecosystem**: Use any Vite plugin

### What You Can Build

- ✅ Documentation sites
- ✅ Blogs with tags/categories
- ✅ Personal websites
- ✅ Landing pages
- ✅ Knowledge bases
- ✅ Component libraries documentation
- ✅ API documentation
- ✅ Educational platforms

---

## Limitations to Be Aware Of

### Known Constraints

| Limitation | Details |
|------------|---------|
| **Large Projects** | May struggle with 1000+ Markdown files (Rollup memory issues) |
| **No Official Plugin System** | Must use Vite plugins or manual customization |
| **Static Only** | No server-side runtime (need external APIs for dynamic data) |
| **Build-Time Data** | All content must be determinable at build time |
| **No Native Permalinks** | Requires workarounds for custom URL structures |

### Not Ideal For

- Full web applications with complex state management
- User-generated content platforms
- Real-time features (chat, live updates)
- E-commerce with dynamic inventory
- Sites requiring authentication-gated content

---

## Markdown Extensions

VitePress uses **markdown-it** as its Markdown renderer with many powerful extensions.

### Syntax Highlighting

VitePress uses **Shiki** for syntax highlighting with support for hundreds of languages.

```js
// Just add the language after the opening backticks
const greeting = 'Hello, VitePress!'
```

### Line Highlighting

Highlight specific lines in code blocks:

````md
```js{1,4,6-8}
// Line 1 - highlighted
const a = 1
const b = 2
// Line 4 - highlighted
const c = 3
// Lines 6-8 - highlighted
const d = 4
const e = 5
```
````

### In-Line Code Annotations

```js
const focused = 'This line is focused' // [!code focus]
const highlighted = 'This line is highlighted' // [!code highlight]
const added = 'This was added' // [!code ++]
const removed = 'This was removed' // [!code --]
const warning = 'Warning line' // [!code warning]
const error = 'Error line' // [!code error]
```

### Line Numbers

````md
```js:line-numbers
// Line numbers will be shown
const a = 1
const b = 2
```

```js:line-numbers=10
// Start from line 10
const c = 3
```
````

### Code Groups

````md
::: code-group

```js [config.js]
export default {
  // JavaScript config
}
```

```ts [config.ts]
export default {
  // TypeScript config
}
```

:::
````

### Custom Containers

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details Click me to expand
This is hidden content.
:::
```

### GitHub-Flavored Alerts

```md
> [!NOTE]
> Useful information

> [!TIP]
> Helpful advice

> [!IMPORTANT]
> Key information

> [!WARNING]
> Potential issues

> [!CAUTION]
> Dangerous consequences
```

### Tables

```md
| Feature | Support |
|---------|:-------:|
| Tables | ✅ |
| Alignment | ✅ |
| Strikethrough | ✅ |
```

### Emoji Support

```md
:tada: :100: :rocket:
```

### Table of Contents

```md
[[toc]]
```

### Custom Anchors

```md
## My Section {#custom-anchor}
```

### Import Code Snippets

```md
<!-- Import entire file -->
<<< @/snippets/snippet.js

<!-- Import with line highlighting -->
<<< @/snippets/snippet.js{2}

<!-- Import specific lines -->
<<< @/snippets/snippet.js#region
```

### Math Equations (with plugin)

```md
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$
```

---

## Using Vue Components in Markdown

### Direct Component Usage

Every Markdown file is compiled as a Vue component:

```md
<script setup>
import CustomButton from './components/CustomButton.vue'
</script>

# My Page

<CustomButton text="Click Me" />
```

### Using Template Syntax

```md
{{ 1 + 1 }}

<span v-for="i in 3">{{ i }} </span>
```

### Component Import Best Practices

**For rarely used components:**
```md
<script setup>
import HeavyComponent from './HeavyComponent.vue'
</script>

<HeavyComponent />
```

**For globally used components** (in `.vitepress/theme/index.js`):
```js
import DefaultTheme from 'vitepress/theme'
import MyGlobalComponent from './components/MyGlobalComponent.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MyGlobalComponent', MyGlobalComponent)
  }
}
```

### SSR Compatibility

For browser-only components:

```vue
<ClientOnly>
  <NonSSRFriendlyComponent />
</ClientOnly>
```

### Styling in Markdown

**Recommended** - Use `<style module>`:
```md
<style module>
.button { color: red; }
</style>

<button :class="$style.button">Click</button>
```

**Not Recommended** - `<style scoped>` adds attributes to every element, bloating page size.

### Component Naming

> ⚠️ **Important**: Component names must contain a hyphen or be in PascalCase, otherwise they're treated as inline elements and wrapped in `<p>` tags, causing hydration mismatches.

```md
<!-- ✅ Good -->
<my-component />
<MyComponent />

<!-- ❌ Bad -->
<mycomponent />
```

---

## Theme Customization

### CSS Variables

Override theme variables in `.vitepress/theme/custom.css`:

```css
:root {
  /* Colors */
  --vp-c-brand-1: #646cff;
  --vp-c-brand-2: #747bff;
  --vp-c-brand-3: #9499ff;

  /* Fonts */
  --vp-font-family-base: 'Inter', sans-serif;
  --vp-font-family-mono: 'Fira Code', monospace;

  /* Layout */
  --vp-sidebar-width: 272px;
  --vp-content-width: 688px;
}

/* Dark mode specific */
.dark {
  --vp-c-brand-1: #9499ff;
  --vp-c-bg: #1a1a1a;
}
```

### Key CSS Variables Reference

#### Brand Colors
```css
--vp-c-brand-1      /* Primary brand color */
--vp-c-brand-2      /* Secondary brand color */
--vp-c-brand-3      /* Tertiary brand color */
--vp-c-brand-soft   /* Soft brand background */
```

#### Background Colors
```css
--vp-c-bg           /* Main background */
--vp-c-bg-soft      /* Soft background */
--vp-c-bg-mute      /* Muted background */
--vp-c-bg-alt       /* Alternative background */
```

#### Text Colors
```css
--vp-c-text-1       /* Primary text */
--vp-c-text-2       /* Secondary text */
--vp-c-text-3       /* Muted text */
```

#### Code Block Colors
```css
--vp-code-block-bg
--vp-code-block-color
--vp-code-line-highlight-color
--vp-code-line-number-color
--vp-code-copy-code-bg
```

### Custom Fonts

```js
// .vitepress/config.mts
export default {
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Your+Font&display=swap', rel: 'stylesheet' }]
  ]
}
```

```css
/* custom.css */
:root {
  --vp-font-family-base: 'Your Font', sans-serif;
}
```

### Without Default Fonts

To exclude Inter font from bundle:

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme-without-fonts'
import './custom.css'

export default DefaultTheme
```

### Layout Slots

Inject content at specific locations:

```vue
<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <div>Content before doc</div>
    </template>

    <template #doc-after>
      <div>Content after doc</div>
    </template>

    <template #sidebar-nav-before>
      <div>Before sidebar navigation</div>
    </template>

    <template #aside-outline-before>
      <div>Before outline</div>
    </template>
  </Layout>
</template>
```

#### Available Slots

| Slot | Location |
|------|----------|
| `doc-top` | Top of doc page |
| `doc-bottom` | Bottom of doc page |
| `doc-before` | Before doc content |
| `doc-after` | After doc content |
| `doc-footer-before` | Before doc footer |
| `sidebar-nav-before` | Before sidebar nav |
| `sidebar-nav-after` | After sidebar nav |
| `aside-top` | Top of aside |
| `aside-bottom` | Bottom of aside |
| `aside-outline-before` | Before outline |
| `aside-outline-after` | After outline |
| `aside-ads-before` | Before ads slot |
| `aside-ads-after` | After ads slot |
| `nav-bar-title-before` | Before nav title |
| `nav-bar-title-after` | After nav title |
| `nav-bar-content-before` | Before nav content |
| `nav-bar-content-after` | After nav content |
| `nav-screen-content-before` | Before mobile nav |
| `nav-screen-content-after` | After mobile nav |
| `home-hero-before` | Before hero |
| `home-hero-after` | After hero |
| `home-features-before` | Before features |
| `home-features-after` | After features |

### Overriding Theme Components

Replace default components via Vite aliases:

```js
// .vitepress/config.mts
import { defineConfig } from 'vitepress'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        './VPNavBar.vue': './components/CustomNavBar.vue'
      }
    }
  }
})
```

---

## SEO Optimization

### Basic Meta Tags

```js
// .vitepress/config.mts
export default {
  title: 'My Site',
  description: 'A VitePress site',

  head: [
    ['meta', { name: 'author', content: 'Your Name' }],
    ['meta', { name: 'keywords', content: 'vitepress, vue, documentation' }],
    ['meta', { property: 'og:title', content: 'My Site' }],
    ['meta', { property: 'og:description', content: 'Site description' }],
    ['meta', { property: 'og:image', content: 'https://mysite.com/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://mysite.com' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ]
}
```

### Frontmatter Meta Tags

```yaml
---
title: Page Title
description: Page description
head:
  - - meta
    - property: og:title
      content: Custom OG Title
  - - meta
    - property: og:image
      content: https://example.com/custom-image.png
---
```

### Dynamic Meta Tags with transformHead

```js
// .vitepress/config.mts
export default {
  transformHead({ pageData }) {
    const head = []

    // Add Open Graph tags dynamically
    head.push(['meta', { property: 'og:title', content: pageData.title }])
    head.push(['meta', { property: 'og:description', content: pageData.description }])

    // Canonical URL
    head.push(['link', { rel: 'canonical', href: `https://mysite.com/${pageData.relativePath.replace('.md', '.html')}` }])

    return head
  }
}
```

### Sitemap Generation

```js
// .vitepress/config.mts
export default {
  sitemap: {
    hostname: 'https://mysite.com',
    lastmodDateOnly: false,
    transformItems: (items) => {
      // Modify sitemap items if needed
      return items.filter(item => !item.url.includes('private'))
    }
  },

  // Enable lastUpdated for <lastmod> tags
  lastUpdated: true
}
```

### Structured Data (JSON-LD)

```js
// .vitepress/config.mts
export default {
  transformHead({ pageData }) {
    const head = []

    // Article structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pageData.title,
      description: pageData.description,
      author: {
        '@type': 'Person',
        name: 'Author Name'
      },
      datePublished: pageData.frontmatter.date,
      dateModified: pageData.lastUpdated
    }

    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(structuredData)
    ])

    return head
  }
}
```

### Robots.txt

Create `docs/public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://mysite.com/sitemap.xml
```

---

## Performance Best Practices

### Development Performance

1. **Disable browser extensions** during development
2. **Use incognito mode** - faster than regular profile
3. **Don't disable cache** in DevTools (affects HMR)
4. **Profile slow plugins** with `vite --debug plugin-transform`

### Build Optimization

```js
// .vitepress/config.mts
export default {
  vite: {
    build: {
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,

      // Rollup options
      rollupOptions: {
        output: {
          manualChunks: {
            // Split large dependencies
            'large-dep': ['large-dependency']
          }
        }
      }
    }
  }
}
```

### Image Best Practices

1. **Use appropriate formats**: WebP, AVIF for modern browsers
2. **Implement lazy loading** for below-fold images
3. **Specify dimensions** to prevent layout shifts
4. **Use responsive images** with srcset

### Avoid Heavy Computations in Hooks

```js
// .vitepress/config.mts
export default {
  transformPageData({ pageData }) {
    // Only run heavy operations in production
    if (process.env.NODE_ENV === 'production') {
      // Heavy computation here
    }
  }
}
```

### Code Splitting Components

```md
<script setup>
// Only loaded when this page is visited
import HeavyComponent from './HeavyComponent.vue'
</script>
```

### Preloading Critical Assets

```js
// .vitepress/config.mts
export default {
  transformHead({ assets }) {
    const fontFile = assets.find(file => /font-name\.\w+\.woff2/)
    if (fontFile) {
      return [
        ['link', { rel: 'preload', href: fontFile, as: 'font', type: 'font/woff2', crossorigin: '' }]
      ]
    }
  }
}
```

### Caching Headers

For production servers:

```
# Static assets with hash (cache forever)
Cache-Control: max-age=31536000, immutable

# HTML files (short cache)
Cache-Control: max-age=0, must-revalidate
```

---

## Search Implementation

### Local Search (Built-in)

```js
// .vitepress/config.mts
export default {
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Reset search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    }
  }
}
```

### Algolia DocSearch

```js
// .vitepress/config.mts
export default {
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'YOUR_INDEX_NAME',

        // Optional: locales for i18n
        locales: {
          '/': {
            placeholder: 'Search docs',
            translations: {
              button: {
                buttonText: 'Search'
              }
            }
          }
        }
      }
    }
  }
}
```

> ⚠️ **Note**: Algolia DocSearch requires your site to be publicly accessible.

### Community Search Plugins

- **vitepress-plugin-search** - Flexsearch-based local search
- **vitepress-plugin-pagefind** - Pagefind integration

---

## Internationalization & RTL

### Multi-Language Setup

Directory structure:
```
docs/
├── en/
│   └── guide.md
├── ar/
│   └── guide.md
└── .vitepress/
    └── config.mts
```

```js
// .vitepress/config.mts
export default {
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    ar: {
      label: 'العربية',
      lang: 'ar',
      dir: 'rtl',
      title: 'موقعي',
      description: 'وصف الموقع',
      themeConfig: {
        nav: [
          { text: 'الرئيسية', link: '/ar/' },
          { text: 'الدليل', link: '/ar/guide' }
        ]
      }
    }
  }
}
```

### RTL (Right-to-Left) Support

```js
// .vitepress/config.mts
export default {
  locales: {
    ar: {
      lang: 'ar',
      dir: 'rtl'
    }
  }
}
```

```css
/* Additional RTL overrides if needed */
:root[dir="rtl"] {
  /* Custom RTL styles */
}

[dir="rtl"] .vp-doc {
  text-align: right;
}

[dir="rtl"] .vp-doc ul,
[dir="rtl"] .vp-doc ol {
  padding-right: 1.25rem;
  padding-left: 0;
}
```

### RTL CSS Plugin (Optional)

For comprehensive RTL support, use PostCSS RTL plugin:

```js
// .vitepress/config.mts
import rtlcss from 'postcss-rtlcss'

export default {
  vite: {
    css: {
      postcss: {
        plugins: [
          rtlcss({
            ltrPrefix: ':where([dir="ltr"])',
            rtlPrefix: ':where([dir="rtl"])'
          })
        ]
      }
    }
  }
}
```

### VitePress i18n Plugin

```bash
npm i vitepress-i18n
```

```js
// .vitepress/config.mts
import { withI18n } from 'vitepress-i18n'

export default withI18n({
  // Your config
}, {
  locales: ['en', 'ar'],
  rootLocale: 'en'
})
```

---

## PWA & Offline Support

### Installation

```bash
npm i @vite-pwa/vitepress -D
```

### Basic Setup

```js
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

export default withPwa(defineConfig({
  // Your VitePress config

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'My VitePress Site',
      short_name: 'MySite',
      description: 'My VitePress PWA',
      theme_color: '#646cff',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}']
    }
  }
}))
```

### Theme Integration

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    onMounted(async () => {
      const { registerSW } = await import('virtual:pwa-register')
      registerSW({ immediate: true })
    })
  }
}
```

### Full Offline Support

```js
// For complete offline support
pwa: {
  workbox: {
    globPatterns: ['**/*'],  // Cache everything
  },
  includeAssets: ['**/*']    // Include all public assets
}
```

---

## Image Optimization

### Manual Lazy Loading

Since VitePress doesn't add `loading="lazy"` by default:

```md
<img src="/image.png" loading="lazy" alt="Description" />
```

Or use markdown-it-attrs:

```md
![Alt text](/image.png){loading=lazy}
```

### Vite Image Plugins

#### vite-plugin-image-optimizer

```bash
npm i vite-plugin-image-optimizer -D
```

```js
// .vitepress/config.mts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default {
  vite: {
    plugins: [
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { quality: 80 }
      })
    ]
  }
}
```

#### vite-imagetools

```bash
npm i vite-imagetools -D
```

```js
// .vitepress/config.mts
import { imagetools } from 'vite-imagetools'

export default {
  vite: {
    plugins: [imagetools()]
  }
}
```

Usage in markdown:
```md
![Image](./image.jpg?w=800&format=webp)
```

#### vite-plugin-image-presets

```bash
npm i vite-plugin-image-presets -D
```

```js
// .vitepress/config.mts
import { imagePresets, widthPreset } from 'vite-plugin-image-presets'

export default {
  vite: {
    plugins: [
      imagePresets({
        responsive: widthPreset({
          widths: [320, 640, 960, 1280],
          formats: {
            webp: { quality: 80 },
            jpg: { quality: 80 }
          },
          loading: 'lazy'
        })
      })
    ]
  }
}
```

### Responsive Images Component

```vue
<!-- .vitepress/theme/components/ResponsiveImage.vue -->
<template>
  <picture>
    <source
      v-for="format in formats"
      :key="format"
      :srcset="generateSrcset(format)"
      :type="`image/${format}`"
    />
    <img
      :src="src"
      :alt="alt"
      :loading="loading"
      :width="width"
      :height="height"
    />
  </picture>
</template>

<script setup>
defineProps({
  src: String,
  alt: String,
  loading: { type: String, default: 'lazy' },
  width: Number,
  height: Number,
  formats: { type: Array, default: () => ['webp', 'jpg'] }
})
</script>
```

---

## Data Loading & Dynamic Routes

### Build-Time Data Loading

Create a data loader file (`*.data.js` or `*.data.ts`):

```js
// posts.data.js
export default {
  watch: ['./posts/**/*.md'],
  async load(watchedFiles) {
    // Process files and return data
    return watchedFiles.map(file => {
      // Parse file content
      return {
        title: '...',
        path: '...'
      }
    })
  }
}
```

Use in Markdown:
```md
<script setup>
import { data } from './posts.data.js'
</script>

<ul>
  <li v-for="post in data" :key="post.path">
    <a :href="post.path">{{ post.title }}</a>
  </li>
</ul>
```

### createContentLoader Helper

```js
// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: true,     // Include raw markdown source
  transform(rawData) {
    return rawData
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
      .map(page => ({
        title: page.frontmatter.title,
        url: page.url,
        excerpt: page.frontmatter.excerpt
      }))
  }
})
```

### Dynamic Routes

File structure:
```
docs/
├── packages/
│   └── [pkg].md        # Dynamic route template
│   └── [pkg].paths.js  # Path loader
```

```js
// [pkg].paths.js
export default {
  paths() {
    return [
      { params: { pkg: 'vue' } },
      { params: { pkg: 'react' } },
      { params: { pkg: 'svelte' } }
    ]
  }
}
```

```md
<!-- [pkg].md -->
# Package: {{ $params.pkg }}

This is the page for {{ $params.pkg }}.
```

### Remote Data for Dynamic Routes

```js
// [pkg].paths.js
export default {
  async paths() {
    const packages = await fetch('https://api.example.com/packages')
      .then(res => res.json())

    return packages.map(pkg => ({
      params: {
        pkg: pkg.name,
        version: pkg.version
      },
      content: pkg.readme  // Optional: inject content
    }))
  }
}
```

### Accessing Route Data in Vue

```vue
<script setup>
import { useData } from 'vitepress'

const { params } = useData()
</script>

<template>
  <div>Package: {{ params.pkg }}</div>
</template>
```

---

## Build Hooks

### Available Hooks

| Hook | When It Runs | Use Case |
|------|--------------|----------|
| `transformHead` | Build only | Add dynamic meta tags |
| `transformPageData` | Build + Dev | Modify page data |
| `transformHtml` | Build only | Modify final HTML |
| `buildEnd` | After build | Generate extra files |

### transformHead

```js
// .vitepress/config.mts
export default {
  transformHead(context) {
    // context: { page, assets, siteConfig, siteData, pageData, title, description, head, content }

    return [
      ['meta', { property: 'og:title', content: context.pageData.title }],
      ['meta', { property: 'og:description', content: context.pageData.description }],
      ['link', { rel: 'canonical', href: `https://mysite.com/${context.page}` }]
    ]
  }
}
```

### transformPageData

```js
// .vitepress/config.mts
export default {
  transformPageData(pageData, context) {
    // Mutate pageData directly or return new values
    pageData.contributors = ['contributor1', 'contributor2']

    // Or return to merge
    return {
      customData: 'value'
    }
  }
}
```

### transformHtml

```js
// .vitepress/config.mts
export default {
  transformHtml(code, id, context) {
    // Modify the final HTML string
    return code.replace(
      '</body>',
      '<script>/* analytics */</script></body>'
    )
  }
}
```

### buildEnd

```js
// .vitepress/config.mts
export default {
  buildEnd(siteConfig) {
    // Generate additional files after build
    // e.g., RSS feed, search index, etc.
  }
}
```

### Preloading Fonts

```js
// .vitepress/config.mts
export default {
  transformHead({ assets }) {
    // Find font file with hash
    const fontFile = assets.find(file => /CustomFont\.\w+\.woff2/)

    if (fontFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: fontFile,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      ]
    }
  }
}
```

---

## Deployment

### GitHub Pages

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy VitePress

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run docs:build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Cloudflare Pages

Build settings:
- Framework preset: **VitePress**
- Build command: `npm run docs:build`
- Output directory: `docs/.vitepress/dist`

> ⚠️ **Warning**: Don't enable Auto Minify for HTML - it removes Vue-meaningful comments.

### Netlify

Create `netlify.toml`:

```toml
[build]
  command = "npm run docs:build"
  publish = "docs/.vitepress/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

Create `vercel.json`:

```json
{
  "buildCommand": "npm run docs:build",
  "outputDirectory": "docs/.vitepress/dist"
}
```

### Base Path Configuration

For subdirectory deployments (e.g., `username.github.io/repo/`):

```js
// .vitepress/config.mts
export default {
  base: '/repo/'
}
```

### Platform Comparison

| Platform | Pros | Best For |
|----------|------|----------|
| **GitHub Pages** | Free, integrated with GitHub | Open source projects |
| **Cloudflare Pages** | 300+ edge locations, free SSL, fast | Global audience, security |
| **Netlify** | Great DX, forms, identity | JAMstack features |
| **Vercel** | Excellent for Vue/React ecosystem | React-heavy teams |

---

## Recommended Plugins

### Official/Core

| Plugin | Description |
|--------|-------------|
| **@vite-pwa/vitepress** | PWA support |
| **vitepress-plugin-mermaid** | Mermaid diagrams |

### Search

| Plugin | Description |
|--------|-------------|
| **vitepress-plugin-search** | Flexsearch local search |
| **vitepress-plugin-pagefind** | Pagefind search integration |

### Content

| Plugin | Description |
|--------|-------------|
| **vitepress-sidebar** | Auto-generate sidebar |
| **vitepress-plugin-tabs** | Tabbed content |
| **@mdit/plugin-katex** | Math equations |

### SEO & Analytics

| Plugin | Description |
|--------|-------------|
| **vitepress-plugin-google-analytics** | GA integration |
| **vitepress-plugin-rss** | RSS feed generation |

### Images

| Plugin | Description |
|--------|-------------|
| **vite-plugin-image-optimizer** | Image optimization |
| **vite-imagetools** | Image transformations |
| **vite-plugin-image-presets** | Responsive image presets |

### i18n

| Plugin | Description |
|--------|-------------|
| **vitepress-i18n** | Easy translations |

### Developer Experience

| Plugin | Description |
|--------|-------------|
| **vite-plugin-inspect** | Debug Vite plugins |
| **unplugin-vue-components** | Auto-import components |

---

## Showcase & Inspiration

### Official Sites Using VitePress

- [Vue.js Documentation](https://vuejs.org)
- [Vite Documentation](https://vitejs.dev)
- [VitePress Documentation](https://vitepress.dev)
- [Pinia Documentation](https://pinia.vuejs.org)
- [VueUse](https://vueuse.org)
- [Vitest](https://vitest.dev)

### Community Showcases

- [Chromatone](https://chromatone.center) - Visual music theory
- [D3.js](https://d3js.org) - Data visualization library
- [UnoCSS](https://unocss.dev) - Atomic CSS engine
- [Iconify](https://iconify.design) - Icon framework

### Discovery Resources

- [VueT elescope VitePress Sites](https://www.vuetelescope.com/explore?framework.slug=vitepress)
- [Awesome VitePress](https://github.com/logicspark/awesome-vitepress-v1)
- [BuiltWith VitePress Sites](https://trends.builtwith.com/websitelist/VitePress)

---

## Quick Reference Cheatsheet

### Essential Files

```
docs/
├── .vitepress/
│   ├── config.mts          # Main config
│   ├── theme/
│   │   ├── index.js        # Theme entry
│   │   ├── custom.css      # Custom styles
│   │   └── Layout.vue      # Custom layout
│   └── cache/              # Build cache (gitignore)
├── public/                 # Static assets
├── index.md               # Home page
└── guide/                 # Content directory
    └── getting-started.md
```

### Common Config Options

```js
// .vitepress/config.mts
export default {
  // Site metadata
  title: 'My Site',
  description: 'Site description',
  lang: 'en-US',
  base: '/',

  // Build options
  srcDir: '.',
  outDir: './.vitepress/dist',
  cleanUrls: true,
  lastUpdated: true,

  // Theme config
  themeConfig: {
    logo: '/logo.svg',
    nav: [...],
    sidebar: [...],
    socialLinks: [...],
    footer: {...},
    search: {...}
  },

  // Head tags
  head: [...],

  // Sitemap
  sitemap: { hostname: 'https://example.com' },

  // Build hooks
  transformHead: () => [],
  transformPageData: () => {},
  buildEnd: () => {}
}
```

### Frontmatter Options

```yaml
---
title: Page Title
description: Page description
outline: [2, 3]
layout: doc | home | page
navbar: true
sidebar: true
aside: true
lastUpdated: true
editLink: true
footer: true
pageClass: custom-page
head:
  - - meta
    - name: keywords
      content: keyword1, keyword2
---
```

---

## Sources & Further Reading

- [VitePress Official Documentation](https://vitepress.dev/)
- [What is VitePress?](https://vitepress.dev/guide/what-is-vitepress)
- [Extending the Default Theme](https://vitepress.dev/guide/extending-default-theme)
- [Markdown Extensions](https://vitepress.dev/guide/markdown)
- [Using Vue in Markdown](https://vitepress.dev/guide/using-vue)
- [Site Config Reference](https://vitepress.dev/reference/site-config)
- [Frontmatter Config](https://vitepress.dev/reference/frontmatter-config)
- [Build-Time Data Loading](https://vitepress.dev/guide/data-loading)
- [Dynamic Routes](https://vitepress.dev/guide/routing)
- [Internationalization](https://vitepress.dev/guide/i18n)
- [Search Configuration](https://vitepress.dev/reference/default-theme-search)
- [Sitemap Generation](https://vitepress.dev/guide/sitemap-generation)
- [Deploy Guide](https://vitepress.dev/guide/deploy)
- [Awesome VitePress](https://github.com/logicspark/awesome-vitepress-v1)
- [VitePress PWA Plugin](https://vite-pwa-org.netlify.app/frameworks/vitepress)
- [10 Stunning VitePress Themes](https://dev.to/silviaodwyer/10-stunning-vitepress-themes-to-check-out-15ci)
- [VitePress Large Projects Discussion](https://github.com/vuejs/vitepress/discussions/3189)
- [Adding Dynamic Meta Tags](https://laros.io/adding-dynamic-meta-tags-to-vitepress)
- [VitePress SEO and Sitemap](https://soubiran.dev/series/create-a-blog-with-vitepress-and-vue-js-from-scratch/enhance-website-visibility-seo-metadata-and-sitemap)

---

*Last updated: January 2026*
