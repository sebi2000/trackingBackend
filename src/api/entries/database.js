const entries = require('../../database/models/entries')

module.exports = {
    getAll: () => entries.find({}).lean().exec(),
    create: entry => entries.create(entry)
}