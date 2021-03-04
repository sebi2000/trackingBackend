const users = require('../../database/models/users')

module.exports = {
    getAll: () => {
        return users.find({}).lean().exec()
    },
    //getById: id => users.findById(id).lean().exec(),
    //update: (id,user) => users.findByIdAndUpdate(id,user).lean().exec(),
    //delete: id => users.findByIdAndDelete(id).lean().exec(),
    create: user => users.create(user) 
}
