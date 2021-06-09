const mongoose = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const companiesSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    representative: String,
    phone: String,
    email: String
})

module.exports = mongoose.model(CONSTANTS.DATABASE.COLLECTIONS.COMPANIES, companiesSchema)