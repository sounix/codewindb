'use strict'

const setupBitacora = require('./lib/bitacora')

module.exports = async function (config) {
  const Bitacora = setupBitacora(config)

  return {
    Bitacora
  }
}
