import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://ungalsoththu.github.io',
  base: '/', // Root URL - special repo name ungalsoththu.github.io serves at root
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ta'],
    routing: {
      prefixDefaultLocale: false, // / for English, /ta/ for Tamil
    }
  }
})
