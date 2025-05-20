import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { injectManifest } from 'workbox-build';
import { resolve } from 'node:path';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
    {
      name: 'workbox',
      writeBundle: async () => {
        await injectManifest({
          swSrc: resolve('src/sw.js'),
          swDest: resolve('dist/sw.js'),
          globDirectory: resolve('dist'),
          globPatterns: [
            '**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,ttf,eot,ico}',
          ],
        });
      },
    },
    {
      name: 'serve-sw-in-development',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/sw.js') {
            const swPath = path.resolve(__dirname, 'dist/sw.js');
            if (fs.existsSync(swPath)) {
              res.setHeader('Content-Type', 'application/javascript');
              res.end(fs.readFileSync(swPath, 'utf-8'));
              return;
            }
          }
          next();
        });
      },
    },
  ],
  // top-level await
  optimizeDeps: {
    exclude: ['content-tag'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
});
