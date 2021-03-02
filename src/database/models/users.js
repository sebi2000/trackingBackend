const mongoose = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const usersSchema = mongoose.Schema({
    nume: String,
    prenume:String,
    email:String,
    telefon:Number
})

module.exports = mongoose.model(CONSTANTS.DATABASE.COLLECTIONS.ADMIN, usersSchema)