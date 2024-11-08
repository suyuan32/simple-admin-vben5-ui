import * as path from 'node:path';

import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      resolve: {
        alias: {
          '#': path.resolve(import.meta.dirname, 'src'),
        },
      },
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
          '/sys-api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/sys-api/, ''),
            // mock代理目标地址
            target: 'http://localhost:9100/',
            ws: true,
          },
        },
      },
    },
  };
});
