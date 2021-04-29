const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../utils/constants')

module.exports = {
    handleResponse: (status, code) => {
        return {status: status, code: code}
    },
    hashPass: password => {
        return bcrypt.hashSync(password, SALT_ROUNDS)
    }
}