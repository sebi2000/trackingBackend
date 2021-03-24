const { check } = require('express-validator')
const checkLogin = [
    check('user.email').isEmail(),
    check('user.password').isLength({ min : 1 })
]
module.exports = {
    checkLogin
}