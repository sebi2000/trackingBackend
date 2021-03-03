const mongoose = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const entriesSchema = mongoose.Schema({
    name: String,
    surename:String,
    email:String,
    phone:String,
    company:String,
    signature:String
})

module.exports = mongoose.model(CONSTANTS.DATABASE.COLLECTIONS.ENTRIES, entriesSchema)
