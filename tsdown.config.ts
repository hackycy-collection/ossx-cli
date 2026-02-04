import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli.ts',
    'src/upload.worker.ts',
  ],
  dts: true,
  exports: true,
})
