const database = require('./database')

module.exports = {
    getAll: () => database.getAll(),
    create: user => database.create(user)  
}