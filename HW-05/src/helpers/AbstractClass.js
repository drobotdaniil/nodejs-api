class DB {
  static findAll(Model) {
    return Model.findAll({
      order: [['id', 'ASC']],
    })
  }

  static async getById(Model, id) {
    const data = await Model.findAll({
      where: {
        id,
      },
    })

    if (data.length) {
      return data
    } else {
      throw new Error('Not found')
    }
  }

  static async getBody(req) {
    let body = ''
    for await (const chunk of req) {
      body += chunk
    }
  
    return JSON.parse(body)
  }

  static async update(Model, req) {
    const data = await DB.getBody(req)
    const updated = await Model.update(data, { where: { id: data.id } })

    if (updated[0]) {
      return 'Updated'
    } else {
      throw new Error('Something went wrong')
    }
  }

  static async save(Model, req) {
    const data = await DB.getBody(req)

    return Model.create(data)
  }

  static async delete(Model, id) {
    const deleted = await Model.destroy({
      where: {
        id,
      },
    })
    if (deleted) {
      return ''
    } else {
      throw new Error('Not deleted')
    }
  }
}

module.exports = DB