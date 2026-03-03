const esbuild = require('esbuild');
const { emptyDir } = require('fs-extra');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

const esbuildProblemMatcherPlugin = {
  name: 'esbuild-problem-matcher',

  setup(build) {
    build.onStart(() => {
      console.log('[esbuild] build started');
    });

    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        if (location == null) return;
        console.error(`    ${location.file}:${location.line}:${location.column}:`);
      });
      console.log('[esbuild] build finished');
    });
  }
}

async function build() {
  await emptyDir('./artifacts');

  const context = await esbuild.context({
    entryPoints: ['./src/extension.ts', './src/server.ts'],
    bundle: true,
    format: 'cjs',
    outdir: './artifacts',
    platform: 'node',
    external: ['vscode'],
    target: 'es2020',
    sourcemap: watch,
    sourcesContent: false,
    minify: production,
    logLevel: 'warning',
    plugins: [esbuildProblemMatcherPlugin],
  });

  if (watch) {
    await context.watch();
  } else {
    await context.rebuild();
    await context.dispose();
  }
}

build().catch(error => {
  console.error('[esbuild] build failed:', error);
  process.exit(1);
})
