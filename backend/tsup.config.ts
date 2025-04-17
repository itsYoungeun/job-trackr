import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server.ts'],
  format: ['cjs'],
  clean: true,
  dts: false,
  target: 'node18',
});