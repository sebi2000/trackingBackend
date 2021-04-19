const { findByIdAndDelete } = require('../../database/models/entries')
const entries = require('../../database/models/entries')

module.exports = {
    getAll: (page, rows, start, end) => entries.find({
        date: {
            $gte: start,
            $lte : end
        }
    }).skip(parseInt(page)*parseInt(rows)).limit(parseInt(rows)).lean().exec(),
    create: entry => entries.create(entry),
    count: (start, end) => entries.find({
        date: {
            $gte: start,
            $lte : end
        }
    }).count(),
    update: (id, newEntry) => entries.findByIdAndUpdate(id, newEntry),
    delete: id => entries.findByIdAndDelete(id).lean().exec()
}