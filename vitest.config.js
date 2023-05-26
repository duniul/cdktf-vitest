import { defineConfig } from 'vitest/config';

/** @type {import('vitest/config').Config} */
export default defineConfig({
  test: {
    clearMocks: true,
    globals: true,
  },
});
