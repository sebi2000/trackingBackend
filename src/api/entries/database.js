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
    }).count()
}