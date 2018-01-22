'use strict'

const chalk = require('chalk')
const debug = require('debug')('codewincaja:db:index')

const codewincajadb = require('../')

const config = {
  database: process.env.DB_NAME || 'CA2015REPOSICIONES',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASS || 'wincaja',
  host: process.env.DB_HOST || '192.168.123.63',
  dialect: 'mssql',
  logging: s => debug(s),
  operatorsAliases: false
}

async function run () {
  const { Bitacora } = await codewincajadb(config).catch(handleFatalError)

//   const proveedores = await Bitacora.findAllProveedores().catch(handleFatalError)
//   console.log(`${chalk.green('[codewincaja-db:Proveedores]')}`)
//   console.log(proveedores)

  const proveedor = await Bitacora.findByCuentaProveedores('2110A0003700000000003').catch(handleFatalError)
  console.log(`${chalk.green('[codewincaja-db:Proveedor]')}`)
  console.log(proveedor)

//   const nombres = await Bitacora.findByNombreProveedores('comercializadora mac ').catch(handleFatalError)
//   console.log(`${chalk.green('[codewincaja-db:ProveedoresNombre]')}`)
//   console.log(nombres)

//   const nombres = await Bitacora.insertProveedor('2110C0007500000000003', '', '', '', '', '', '').catch(handleFatalError)
//   console.log(`${chalk.green('[codewincaja-db:ProveedoresNombre]')}`)
//   console.log(nombres)

  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[codewincaja-db:Mensaje]')} `, err.message)
  console.error(`${chalk.red('[codewincaja-db:Detalle]')} `, err.stack)
  process.exit(1)
}

run()
