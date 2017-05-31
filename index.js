'use strict'

const { existsSync } = require('fs')
const { resolve } = require('path')

const applyEnv = env => Object.keys(env).forEach(key => {
  process.env[key] = env[key]
})

const config = () => {
  const NOW_PATH = resolve('./now.json')

  if (existsSync(NOW_PATH)) {
    const nowFile = require(NOW_PATH)

    if (nowFile.env) {
      return applyEnv(nowFile.env)
    }
  }

  const PKG_PATH = resolve('./package.json')

  const pkgFile = require(PKG_PATH)

  if (pkgFile.now && pkgFile.now.env) {
    return applyEnv(pkgFile.now.env)
  }
}

exports.config = config
