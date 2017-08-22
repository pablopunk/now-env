'use strict'

const { existsSync } = require('fs')
const { resolve } = require('path')

function getValue(env, secrets, key) {
  const value = `${env[key]}`
  if (value.indexOf('@') !== 0) return value
  const secret = secrets[env[key]]
  if (secret !== undefined) return secret
  return secrets[env[key].slice(1)]
}

function applyEnv(env, secrets) {
  for (const key in env) {
    // if the key already exists don't overwrite it
    if (!process.env[key]) {
      const value = getValue(env, secrets, key)
      process.env[key] = value
    }
  }
}

function loadSecrets() {
  const SECRET_PATH = resolve('./now-secrets.json')
  if (existsSync(SECRET_PATH)) {
    return require(SECRET_PATH)
  }
  return {}
}

function config() {
  // only run this if it's not running inside Now.sh
  if (Boolean(process.env.NOW)) return

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

exports.config = config
