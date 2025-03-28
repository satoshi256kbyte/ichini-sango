import { build } from 'esbuild';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';

// ビルド設定
const buildConfig = async () => {
  if (!existsSync('./dist')) {
    await mkdir('./dist');
  }

  await build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    platform: 'node',
    target: 'node18',
    format: 'esm',
    minify: false,
    sourcemap: true,
  });
};

buildConfig().catch(err => {
  console.error('ビルドエラー:', err);
  process.exit(1);
});
