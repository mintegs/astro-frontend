// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import solidJs from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({ include: ["**/react/*", "**/react/**/*"] }),
    solidJs({ include: ["**/solid/*", "**/solid/**/*"] }),
    tailwind(),
  ],
});
