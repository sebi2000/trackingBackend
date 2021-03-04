const database = require('./database')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../../utils/constants')

module.exports = {
    getAll: () => database.getAll(),
    create: user => {
        const hash = bcrypt.hashSync(user.password, SALT_ROUNDS)
        user.password = hash 
        return database.create(user)
    },
    getById: id => database.getById(id),
    update: (id, user) => database.update(id, user)
}