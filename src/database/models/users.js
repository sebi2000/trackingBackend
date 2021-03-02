const mongoose = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const usersSchema = mongoose.Schema({
    nume: String,
    prenume:String,
    email:String,
    telefon:String
})

module.exports = mongoose.model(CONSTANTS.DATABASE.COLLECTIONS.USERS, usersSchema)