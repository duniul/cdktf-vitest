import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm', 'cjs'],
  entry: ['src/index.ts'],
  outDir: 'dist',
  target: 'node16',
  splitting: true,
  sourcemap: false,
  clean: true,
  dts: true,
});
