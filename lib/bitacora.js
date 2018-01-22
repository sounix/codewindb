'use strict'

const codewincajadb = require('./db')

module.exports = function (config) {
  async function findAllProveedores () {
    const db = codewincajadb(config)

    const query = `
        SELECT 
            Cuenta,Proveedor,RFC,Direccion,Telefono,Email
        FROM BitacoraDigital.Proveedores
    `

    const rows = db.query(query, { type: db.QueryTypes.SELECT })

    return rows
  }

  async function findByCuentaProveedores (value) {
    const db = codewincajadb(config)

    const query = `
        SELECT 
            Cuenta,Proveedor,RFC,Direccion,Telefono,Email
        FROM BitacoraDigital.Proveedores
        WHERE Cuenta = '${value}'
    `

    const row = db.query(query, { type: db.QueryTypes.SELECT })

    return row
  }

  async function findByNombreProveedores (value) {
    const db = codewincajadb(config)

    value = value.replace(' ', '%')

    const query = `
        SELECT 
            Cuenta,Proveedor,RFC,Direccion,Telefono,Email
        FROM BitacoraDigital.Proveedores
        WHERE Proveedor LIKE '%${value}%'
    `

    const rows = db.query(query, { type: db.QueryTypes.SELECT })

    return rows
  }

  async function insertProveedor (cuenta, proveedor, rfc, direccion, telefono, email) {
    const db = codewincajadb(config)

    const query = `
        INSERT INTO BitacoraDigital.Proveedores
            (Cuenta,Proveedor,RFC,Direccion,Telefono,Email) 
        VALUES 
            ('${cuenta}','${proveedor}','${rfc}','${direccion}','${telefono}','${email}')
      `

    const row = db.query(query, { type: db.QueryTypes.INSERT })

    return row
  }

  return {
    findAllProveedores,
    findByCuentaProveedores,
    findByNombreProveedores,
    insertProveedor
  }
}
