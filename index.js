'use strict'

const { resolve } = require('path')

/**
 * Get the value of a environment variable or secret
 * @param  {Object} env     Map of environment variables
 * @param  {Object} secrets Map of secrets
 * @param  {String} key     The environment key name
 * @return {String}         The environment value
 */
function getValue(env, secrets, key) {
  // get environment value
  const value = `${env[key]}`
  // if the value doesn't start with @ (it's not a secret) return it
  if (value.indexOf('@') !== 0) return value
  // check if the value is in the secret map
  const secret = secrets[value]
  // if is defined return the secret
  if (secret !== undefined) return secret
  // try get the secret value without @ from the map or return the value
  return secrets[value.slice(1)] || value
}

/**
 * Apply the environment variables to `process.env`
 * @param  {Object} env     Map of environment variables
 * @param  {Object} secrets Map of secrets
 */
function applyEnv(env, secrets) {
  for (const key in env) {
    // if the key already exists don't overwrite it
    if (!process.env[key]) {
      const value = getValue(env, secrets, key)
      process.env[key] = value
    }
  }
}

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

/**
 * Apply the environment variables from `./now.json`
 * @param  {Object}  secrets Map of secrets
 * @return {Boolean}         If the environment variables were applied
 */
function loadNowJSON(secrets) {
  const NOW_PATH = resolve('./now.json')

  try {
    const nowFile = require(NOW_PATH)

    if (nowFile.env) {
      applyEnv(nowFile.env, secrets)
    }

    return true
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return false
    }
    throw error
  }
}

/**
 * Apply the environment variables from `./package.json`
 * @param  {Object}  secrets Map of secrets
 * @return {Boolean}         If the environment variables were applied
 */
function loadPkgJSON(secrets) {
  const PKG_PATH = resolve('./package.json')

  try {
    const pkgFile = require(PKG_PATH)

    if (pkgFile.now && pkgFile.now.env) {
      applyEnv(pkgFile.now.env, secrets)
    }

    return true
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return false
    }
    throw error
  }
}

/**
 * Check if is running inside Now.sh and apply variables and secrets to `process.env`
 */
function config() {
  // only run this if it's not running inside Now.sh
  if (Boolean(process.env.NOW)) return

  // load secrets
  const secrets = loadSecrets()

  // load environment variables from now.json
  const hasLoaded = loadNowJSON(secrets)

  // if now.json doesn't exists
  if (!hasLoaded) {
    // load from package.json
    loadPkgJSON(secrets)
  }
}

exports.config = config
