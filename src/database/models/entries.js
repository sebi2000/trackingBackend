const mongoose = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const entriesSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    company: String,
    signature: String,
    series: String,
    number: String,
    duration: String,
    date: Date,
    observations: String
})

module.exports = mongoose.model(CONSTANTS.DATABASE.COLLECTIONS.ENTRIES, entriesSchema)
