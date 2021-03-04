const database = require('./database')

module.exports = {
    getAll: () => database.getAll(),
    create: user => {
        return database.create(user)
    }
}