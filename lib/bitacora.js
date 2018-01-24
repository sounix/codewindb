'use strict'

const codewincajadb = require('./db')

module.exports = function (config) {
  const db = codewincajadb(config)

  async function findAllProveedores () {
    const query = `
        SELECT 
            Cuenta,Proveedor,RFC,Direccion,Telefono,Email
        FROM BitacoraDigital.Proveedores
    `
    const rows = db.query(query, { type: db.QueryTypes.SELECT })

    return rows
  }

  async function findByCuentaProveedores (value) {
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
    const query = `
        INSERT INTO BitacoraDigital.Proveedores
            (Cuenta,Proveedor,RFC,Direccion,Telefono,Email) 
        VALUES 
            ('${cuenta}','${proveedor}','${rfc}','${direccion}','${telefono}','${email}')
      `
    const row = db.query(query, { type: db.QueryTypes.INSERT })

    return row
  }

  async function deleteProveedor (cuenta) {
    const query = `
        DELETE FROM BitacoraDigital.Proveedores
        WHERE Cuenta = '${cuenta}'
      `
    const row = db.query(query, { type: db.QueryTypes.DELETE })

    return row
  }

  async function updateProveedor (cuenta, proveedor, rfc, direccion, telefono, email) {
    const query = `
        UPDATE BitacoraDigital.Proveedores SET 
          Proveedor = '${proveedor}', Rfc = '${rfc}', Direccion = '${direccion}', 
          Telefono = '${telefono}', Email = '${email}'
        WHERE Cuenta = '${cuenta}'
      `
    const row = db.query(query, { type: db.QueryTypes.UPDATE })

    return row
  }

  async function findAllCompras (sucursal) {
    const query = `
        SELECT 
          id,Sucursal,Fecha,Folio,Proveedor,Subtotal,Descuento,Ieps,Iva,Total,
          Documento,Estatus
        FROM BitacoraDigital.Compras
        WHERE Sucursal = '${sucursal}'
        ORDER BY Folio DESC
    `
    const rows = db.query(query, { type: db.QueryTypes.SELECT })

    return rows
  }

  async function findYearCompras (sucursal) {
    const query = `
        SELECT 
          id,Sucursal,Fecha,Folio,Proveedor,Subtotal,Descuento,Ieps,Iva,Total,
          Documento,Estatus
        FROM BitacoraDigital.Compras
        WHERE Sucursal = '${sucursal}'
          AND YEAR(Fecha) = YEAR(GETDATE())
        ORDER BY Folio DESC
    `
    const rows = db.query(query, { type: db.QueryTypes.SELECT })

    return rows
  }

  async function findMonthCompras (sucursal) {
    const query = `
        SELECT 
          id,Sucursal,Fecha,Folio,Proveedor,Subtotal,Descuento,Ieps,Iva,Total,
          Documento,Estatus
        FROM BitacoraDigital.Compras
        WHERE Sucursal = '${sucursal}'
          AND YEAR(Fecha) = YEAR(GETDATE()) AND MONTH(Fecha) = MONTH(GETDATE())
        ORDER BY Folio DESC
    `
    const rows = db.query(query, { type: db.QueryTypes.SELECT })

    return rows
  }

  async function findToDayCompras (sucursal) {
    const query = `
        SELECT 
          id,Sucursal,Fecha,Folio,Proveedor,Subtotal,Descuento,Ieps,Iva,Total,
          Documento,Estatus
        FROM BitacoraDigital.Compras
        WHERE Sucursal = '${sucursal}'
          AND CONVERT(NVARCHAR(8),Fecha,112) = CONVERT(NVARCHAR(8),GETDATE(),112)
        ORDER BY Folio DESC
    `
    const rows = db.query(query, { type: db.QueryTypes.SELECT })

    return rows
  }

  async function findByFolioCompras (sucursal, folio) {
    const query = `
        SELECT 
          id,Sucursal,Fecha,Folio,Proveedor,Subtotal,Descuento,Ieps,Iva,Total,
          Documento,Estatus
        FROM BitacoraDigital.Compras
        WHERE Sucursal = '${sucursal}'
          AND Folio = '${folio}'
    `
    const row = db.query(query, { type: db.QueryTypes.SELECT })

    return row
  }

  async function insertCompra (id, sucursal, fecha, folio, proveedor, subtotal, descuento, ieps, iva, total, documento, estatus) {
    const query = `
        INSERT INTO BitacoraDigital.Compras
            (id,Sucursal,Fecha,Folio,Proveedor,Subtotal,Descuento,Ieps,Iva,Total,Documento,Estatus) 
        VALUES 
            ('${id}','${sucursal}','${fecha}','${folio}','${proveedor}','${subtotal}','${descuento}','${ieps}','${iva}','${total}','${documento}','${estatus}')
      `
    const row = db.query(query, { type: db.QueryTypes.INSERT })

    return row
  }

  async function updateCompra (id, sucursal, fecha, folio, proveedor, subtotal, descuento, ieps, iva, total, documento) {
    const query = `
        UPDATE BitacoraDigital.Compras
            SET Fecha = '${fecha}', Folio = '${folio}', Proveedor = '${proveedor}', Subtotal = '${subtotal}', Descuento = '${descuento}', Ieps = '${ieps}', Iva = '${iva}', Total = '${total}', Documento = '${documento}' 
        WHERE  
            Sucursal = '${sucursal}' AND id = '${id}'
      `
    const row = db.query(query, { type: db.QueryTypes.UPDATE })

    return row
  }

  async function deleteCompra (id, sucursal, folio) {
    const query = `
        UPDATE BitacoraDigital.Compras
            SET Estatus = 'CANCELADO'
        WHERE  
            Sucursal = '${sucursal}' AND id = '${id}' AND Folio = '${folio}'
      `
    const row = db.query(query, { type: db.QueryTypes.UPDATE })

    return row
  }

  async function newFolioCompra (sucursal) {
    const query = `
        SELECT 
          Folio = CASE WHEN COUNT(*) > 0 THEN '${sucursal}' + CONVERT(NVARCHAR(8),GETDATE(),112) + RIGHT('00' + CAST(CAST(RIGHT(MAX(Folio), 2) AS INT) + 1 AS NVARCHAR),2) ELSE '${sucursal}' + CONVERT(NVARCHAR(8),GETDATE(),112) + '01' END
        FROM BitacoraDigital.Compras
        WHERE Sucursal = '${sucursal}'
          AND CONVERT(NVARCHAR(8),Fecha,112) = CONVERT(NVARCHAR(8),GETDATE(),112)
    `
    const row = db.query(query, { type: db.QueryTypes.SELECT })

    return row
  }

  return {
    findAllProveedores,
    findByCuentaProveedores,
    findByNombreProveedores,
    insertProveedor,
    deleteProveedor,
    updateProveedor,

    findAllCompras,
    findYearCompras,
    findMonthCompras,
    findToDayCompras,
    findByFolioCompras,
    insertCompra,
    updateCompra,
    deleteCompra,
    newFolioCompra
  }
}
