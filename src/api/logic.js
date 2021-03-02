const database = require('./database')

module.exports = {
    getAll: () => database.getAll(),
    getById: id => database.getById(id)

}