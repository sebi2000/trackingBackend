const mongoose = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const trackingSchema = mongoose.Schema({
    name: String,
    surname: String,
    action: String,
    date: Date,
    table: String
})

module.exports = mongoose.model(CONSTANTS.DATABASE.COLLECTIONS.TRACKING, trackingSchema)