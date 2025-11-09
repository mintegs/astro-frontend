// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import solidJs from '@astrojs/solid-js'

import netlify from '@astrojs/netlify'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({ include: ['**/react/*', '**/react/**/*'] }),
    solidJs({ include: ['**/solid/*', '**/solid/**/*'] }),
  ],

  output: 'server',

  adapter: netlify({
    edgeMiddleware: true,
    cacheOnDemandPages: true,
  }),

  vite: { plugins: [tailwindcss()] },
})
