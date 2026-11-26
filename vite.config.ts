import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const PRODUCTION_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "media-src 'self' https:",
  'frame-src https://www.youtube-nocookie.com https://player.vimeo.com',
  "connect-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ');

function productionSecurityMetaPlugin(): Plugin {
  return {
    name: 'production-csp-meta',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${PRODUCTION_CSP}" />`,
      );
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), productionSecurityMetaPlugin()],
  server: {
    host: '127.0.0.1',
    port: 8080,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
