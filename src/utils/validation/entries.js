const { check } = require('express-validator')
const checkEntries = [
    check('entries.surname').isAlpha(),
    check('entries.name').isAlpha(),
    check('entries.email').isEmail(),
    check('entries.phone').isNumeric(),
    check('entries.company').isLength({ min : 1 }),
    check('entries.signature').isLength({ min : 1 })
]
module.exports = {
    checkEntries
}