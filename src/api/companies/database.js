const companies = require('../../database/models/companies')

module.exports = {
    create: company => companies.create(company),
    getAll: (page, rows) => companies.find({}).skip(parseInt(page)*parseInt(rows)).limit(parseInt(rows)).lean().exec(),
    count: () => companies.count(),
    update: (id, company) => companies.findByIdAndUpdate(id, company),
    delete: id => companies.findByIdAndDelete(id)
}