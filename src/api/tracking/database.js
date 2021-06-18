const tracking = require('../../database/models/tracking')

module.exports = {
  getAll: (page, rows) => tracking.find({}).skip(parseInt(page)*parseInt(rows)).limit(parseInt(rows)).lean().exec(),
  count: () => tracking.count(),
  create: (track) => tracking.create(track),
}
