class DB {
  static async findAll(Model) {
    return Model.findAll({
      order: [['id', 'ASC']],
    })
  }

  static async getById(Model, id) {
    const data = await Model.findByPk(id)

    if (data) {
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
    if (!deleted) throw new Error('Not deleted')
  }
}

module.exports = DB
