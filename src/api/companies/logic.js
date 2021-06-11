const database = require('./database')

module.exports = {
    create: company => database.create(company),
    getAll: (page, rows) => Promise.all([database.getAll(page, rows), database.count()]),
    update: (id, company) => database.update(id, company),
    delete: id => database.delete(id)
}