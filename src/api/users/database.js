const users = require('../../database/models/users')

module.exports = {
    getAll: () => {
        return users.find({}).lean().exec()
    },
    getById: id => users.findById(id).lean().exec(),
    create: user => users.create(user) 
}
