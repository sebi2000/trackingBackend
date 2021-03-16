const database = require('./database')

module.exports = {
    getAll: () => database.getAll(),
    create: entry => database.create(entry)
}
