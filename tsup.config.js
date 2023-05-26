import { defineConfig } from 'tsup';

/** @type {import('vitest/config').Config} */
export default defineConfig({
  format: ['esm', 'cjs'],
  entry: ['src/index.ts'],
  target: 'node16',
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
});
