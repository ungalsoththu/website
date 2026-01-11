import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://username.github.io', // Will be updated with actual username
  base: '/website', // Matches repo name, critical for GitHub Pages
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ta'],
    routing: {
      prefixDefaultLocale: false, // / for English, /ta/ for Tamil
    }
  }
})
