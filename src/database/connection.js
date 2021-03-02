const mongoose = require('mongoose')
const CONSTANTS = require('../utils/constants')

module.exports = () => mongoose.connect(CONSTANTS.DATABASE.URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})