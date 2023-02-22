import { join } from 'node:path'

export default {
  webpack: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
}
