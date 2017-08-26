const { resolve } = require('path')

/**
 * Load the environment secrets from `./now-secrets.json`
 * @return {Object} Map of secrets
 */
function loadSecrets() {
  const SECRET_PATH = resolve('./now-secrets.json')

  try {
    return require(SECRET_PATH)
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return {}
    }
    throw error
  }
}

module.exports = loadSecrets
