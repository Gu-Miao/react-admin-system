import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from '@nabla/vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import { createHtmlPlugin } from 'vite-plugin-html'
import { fileURLToPath, URL } from 'node:url'

function joinPath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url))
}

function handleBooleanEnv(env: string) {
  return env === 'false' ? false : env === 'true' ? true : undefined
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      svgr(),
      eslint({
        eslintOptions: {
          cacheLocation: joinPath('node_modules/.eslintcache'),
        },
      }),
      createHtmlPlugin({
        minify: true,
      }),
    ],
    resolve: {
      alias: {
        '@': joinPath('src'),
      },
    },
    server: {
      port: +env.VITE_PORT,
      open: handleBooleanEnv(env.VITE_OPEN),
    },
  }
})
