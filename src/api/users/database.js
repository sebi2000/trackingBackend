const users = require('../../database/models/users')

module.exports = {
    getAll: (page, rows) => users.find({}).skip(parseInt(page)*parseInt(rows)).limit(parseInt(rows)).lean().exec(),
    delete: id => users.findByIdAndDelete(id),
    count: () => users.count(),
    getById: id => users.findById(id).lean().exec(),
    update: (id,user) => users.findByIdAndUpdate(id,user).lean().exec(),
    create: user =>users.create(user),
    getByName: name => users.findOne({ name: name }).lean().exec(),
    getByEmail: email => users.findOne({ email: email}).lean().exec()
}
