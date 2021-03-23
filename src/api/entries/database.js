const entries = require('../../database/models/entries')

module.exports = {
    getAll: (page, rows) => entries.find({}).skip(parseInt(page)*parseInt(rows)).limit(parseInt(rows)).lean().exec(),
    create: entry => entries.create(entry),
    count: () => entries.count()
}