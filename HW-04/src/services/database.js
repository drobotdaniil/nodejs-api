const client = require('../helpers/db-connect')

class DatabaseService {
  static async getAll(table) {
    const { rows: result } = await client.query(`SELECT * FROM ${table} ORDER BY id ASC`)
    return result
  }

  static async getById(id, table) {
    const { rows: data } = await client.query(`SELECT * FROM ${table} WHERE id = $1`, [id])

    if (data.length) {
      return data
    } else {
      throw new Error()
    }
  }

  static async save(table, column, content) {
    const {
      rows: data,
    } = await client.query(`INSERT INTO ${table} (${column}) VALUES($1) RETURNING *`, [content])
    return data
  }

  static async delete(table, id) {
    const { rowCount: data } = await client.query(`DELETE FROM ${table} WHERE id = $1`, [id])

    if (data) {
      return data
    } else {
      throw new Error()
    }
  }

  static async update(table, column, id, content) {
    const {
      rows: data,
    } = await client.query(`UPDATE ${table} SET ${column} = $2 WHERE id = $1 RETURNING *`, [
      id,
      content,
    ])

    if (data.length) {
      return data
    } else {
      throw new Error()
    }
  }

  static async setDoc(id, managerId) {
    const { rows: data } = await client.query(
      `UPDATE documents SET managerid = ${managerId} WHERE id = ${id} RETURNING *`
    )

    if (data.length) {
      return data
    } else {
      throw new Error()
    }
  }
}

module.exports = DatabaseService
