const { join } = require('node:path')

module.exports = {
  /**
   * @param {import('webpack').Configuration} config
   * @param {*} env
   */
  webpack(config, env) {
    config.resolve.alias = {
      '@': join(__dirname, 'src')
    }
    return config
  }
}
