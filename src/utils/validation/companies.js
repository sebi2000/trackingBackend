const { check } = require('express-validator')
const checkCompanies = [
    check('newCompany.representative').isAlpha(),
    check('newCompany.name').isAlpha(),
    check('newCompany.email').isEmail(),
    check('newCompany.phone').isNumeric(),
]
module.exports = {
    checkCompanies
}