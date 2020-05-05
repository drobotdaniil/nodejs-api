const formatDate = date => new Date(date).toISOString();

const transformEvent = event => ({
  ...event.dataValues,
  ...{ date: formatDate(event.date) }
});

async function events(db) {
  const events = await db.Event.scope('withUser').findAll({
    include: [{
      model: db.User.scope('withEvents'),
      as: 'user'
    }]
  });

  return events.map(event => transformEvent(event));
}

async function createEvent({ title, description, price, date }, userId, db) {
  const event = await db.Event.create({
    title,
    description,
    price,
    date,
    userId
  });

  return await db.Event.scope('withUser').findByPk(event.id);
}

async function deleteEvent(id, db) {
  const deleted = await db.Event.destroy({ where: { id, } });

  if (!deleted) throw new Error('Something went wrong!');

  return 'DELETED';
}

async function updateEvent(data, db) {
  const updated = await db.Event.update(data, { where: { id: data.id } })

  if (updated[0]) {
    return 'Updated'
  } else {
    throw new Error('Something went wrong!')
  }
}

module.exports = {
  events,
  createEvent,
  deleteEvent,
  updateEvent,
}
