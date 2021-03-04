const database = require('./database')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    getAll: () => database.getAll(),
    create: user => {
        let hash = bcrypt.hashSync(user.password, saltRounds)
        user.password = hash 
        return database.create(user)
    }
}