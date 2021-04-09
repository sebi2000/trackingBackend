const database = require('./database')

module.exports = {
    getAll: (page, rows, start, end) => Promise.all([database.getAll(page, rows, start, end), database.count(start, end)]),
    create: entry => database.create(entry)
}
