const database = require('./database')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../../utils/constants')
const { hashPass } = require('../../utils/helpers')

module.exports = {
    getAll: () => database.getAll(),
    create: user => {
        user.password = hashPass(user.password)
        return database.create(user)
    },
    getById: id => database.getById(id),
    update: (id, user) => {
        if(user.password !== undefined)
            user.password = hashPass(user.password)
        
       return database.update(id, user)
    }
}