import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.swiftora.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
  vite: { build: { sourcemap: false } },
});
