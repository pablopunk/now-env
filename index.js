'use strict'

const { existsSync } = require('fs')
const { resolve } = require('path')

const applyEnv = (env, secrets) => {
  for (const key in env) {
    // if the key already exists don't overwrite it
    if (!process.env[key]) {
      const value = secrets[env[key]] || secrets[env[key].slice(1)] || env[key]
      process.env[key] = value
    }
  }
}

const loadSecrets = () => {
  const SECRET_PATH = resolve('./now-secrets.json')
  if (existsSync(SECRET_PATH)) {
    return require(SECRET_PATH)
  }
  return {}
}

const config = () => {
  // only run this in a non-production environment
  if (process.env.NODE_ENV !== 'production') {
    const secrets = loadSecrets()

    const NOW_PATH = resolve('./now.json')

    if (existsSync(NOW_PATH)) {
      const nowFile = require(NOW_PATH)

      if (nowFile.env) {
        return applyEnv(nowFile.env, secrets)
      }
    }

    const PKG_PATH = resolve('./package.json')

    const pkgFile = require(PKG_PATH)

    if (pkgFile.now && pkgFile.now.env) {
      return applyEnv(pkgFile.now.env, secrets)
    }
  }
}

exports.config = config
