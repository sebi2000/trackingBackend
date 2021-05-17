const { check } = require('express-validator')
const checkRegister = [
    check('user.surname').isAlpha(),
    check('user.name').isAlpha(),
    check('user.email').isEmail(),
    check('user.phone').isNumeric(),
]
module.exports = {
    checkRegister
}