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

  // const proveedor = await Bitacora.findByCuentaProveedores('2110A0003700000000003').catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:Proveedor]')}`)
  // console.log(proveedor)

//   const nombres = await Bitacora.findByNombreProveedores('comercializadora mac ').catch(handleFatalError)
//   console.log(`${chalk.green('[codewincaja-db:ProveedoresNombre]')}`)
//   console.log(nombres)

  // const nombre = await Bitacora.insertProveedor('2110C0020100000000003', '', '', '', '', '', '').catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:ProveedoresNombre]')}`)
  // console.log(nombre)

  // const nombres = await Bitacora.deleteProveedor('2110C0007500000000003').catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:ProveedoresNombre]')}`)
  // console.log(nombres)

  // const nombres = await Bitacora.updateProveedor('2110C0020100000000003', 'ALDRIN GONZALEZ CANCINO', 'GOCA8108126L5', '', '', '', '').catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:ProveedoresNombre]')}`)
  // console.log(nombres)

  // const sucursal = 'ZR'
  // const compras = await Bitacora.findAllCompras(sucursal).catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:AllCompras]')}`)
  // console.log(compras)

  // const sucursal = 'VC'
  // const compras = await Bitacora.findYearCompras(sucursal).catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:YearCompras]')}`)
  // console.log(compras)

  // const sucursal = 'OU'
  // const compras = await Bitacora.findMonthCompras(sucursal).catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:YearCompras]')}`)
  // console.log(compras)

  // const sucursal = 'OU'
  // const compras = await Bitacora.findToDayCompras(sucursal).catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:YearCompras]')}`)
  // console.log(compras)

  // const sucursal = 'OU'
  // const folio = 'OU2015102103'
  // const compras = await Bitacora.findByFolioCompras(sucursal, folio).catch(handleFatalError)
  // console.log(`${chalk.green('[codewincaja-db:YearCompras]')}`)
  // console.log(compras)

  const nombre = await Bitacora.insertCompra('48622DB0-A49C-4C1C-9419-E8E88XXAC898', 'VC', '2015-11-10T12:23:12.703', 'JL2018012299', 'BIMBO SA DE CV', '612.34', '0.00', '0.00', '0.00', '612.34', 'FACT', 'A TIEMPO').catch(handleFatalError)
  console.log(`${chalk.green('[codewincaja-db:ProveedoresNombre]')}`)
  console.log(nombre)

  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[codewincaja-db:Mensaje]')} `, err.message)
  console.error(`${chalk.red('[codewincaja-db:Detalle]')} `, err.stack)
  process.exit(1)
}

run()
