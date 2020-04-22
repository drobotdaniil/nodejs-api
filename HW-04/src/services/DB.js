const client = require('../pg-connect')

class DB {
  static async getAll(table) {
    return (await client.query(`SELECT * FROM ${table} ORDER BY id ASC`)).rows
  }

  static async getById(id, table) {
    const data = (
      await client.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
    ).rows

    if (data.length) {
      return data
    } else {
      throw new Error()
    }
  }

  static async save(table, column, content) {
    return (
      await client.query(
        `INSERT INTO ${table} (${column}) VALUES($1) RETURNING *`,
        [content]
      )
    ).rows
  }

  static async delete(table, id) {
    const data = (
      await client.query(`DELETE FROM ${table} WHERE id = $1`, [id])
    ).rowCount

    if (data) {
      return data
    } else {
      throw new Error()
    }
  }

  static async update(table, column, id, content) {
    const data = (
      await client.query(
        `UPDATE ${table} SET ${column} = $2 WHERE id = $1 RETURNING *`,
        [id, content]
      )
    ).rows

    if (data.length) {
      return data
    } else {
      throw new Error()
    }
  }

  static async setDoc(id, managerId) {
    const data = (
      await client.query(
        `UPDATE documents SET managerid = ${managerId} WHERE id = ${id} RETURNING *`
      )
    ).rows

    if (data.length) {
      return data
    } else {
      throw new Error()
    }
  }
}

module.exports = DB
