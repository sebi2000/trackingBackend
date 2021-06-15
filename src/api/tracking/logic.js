const database = require('./database')

module.exports = {
  getAll: (page, rows) => Promise.all([database.getAll(page, rows), database.count()]),
  create: (tracking) => database.create(tracking),
}
