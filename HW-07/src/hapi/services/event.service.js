const formatDate = date => new Date(date).toISOString();

const transformEvent = event => ({
  ...event.dataValues,
  ...{ date: formatDate(event.date) }
});

class EventService {
  constructor(model, userModel) {
    this.model = model;
    this.userModel = userModel;
  }

  events = async () => {
    const events = await this.model.scope('withUser').findAll({
      include: [{
        model: this.userModel.scope('withEvents'),
        as: 'user'
      }]
    });

    return events.map(event => transformEvent(event));
  }

  createEvent = async ({ title, description, price, date }, userId) => {
    const event = await this.model.create({
      title,
      description,
      price,
      date,
      userId
    });

    return await this.model.scope('withUser').findByPk(event.id);
  }

  deleteEvent = async (id) => {
    const deleted = await this.model.destroy({ where: { id } })

    if (!deleted) throw new Error('Something went wrong!')

    return 'DELETED'
  }

  updateEvent = async (data) => {
    const updated = await this.model.update(data, { where: { id: data.id } })

    if (updated[0]) {
      return 'Updated'
    } else {
      throw new Error('Something went wrong!')
    }
  }

}

module.exports = EventService;
