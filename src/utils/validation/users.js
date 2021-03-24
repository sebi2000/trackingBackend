const { check } = require('express-validator')
const checkRegister = [
    check('user.surname').isAlpha(),
    check('user.name').isAlpha(),
    check('user.email').isEmail(),
    check('user.phone').isNumeric(),
    check('user.password').isLength({ min : 1 })
]
module.exports = {
    checkRegister
}