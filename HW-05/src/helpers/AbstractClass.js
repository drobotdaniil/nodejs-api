class DB {
  static async findAll(Model) {
    const result =  await Model.findAll({
      order: [['id', 'ASC']],
    })

    return result.length ? result : 'No searched data'
  }

  static async getById(Model, id) {
    const { dataValues: data } = await Model.findByPk(id)

    if ([data].length) {
      return data
    } else {
      throw new Error('Not found')
    }
  }

  static async update(Model, data) {
    const updated = await Model.update(data, { where: { id: data.id } })

    if (updated[0]) {
      return 'Updated'
    } else {
      throw new Error('Something went wrong')
    }
  }

  static async save(Model, data) {
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
