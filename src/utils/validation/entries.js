const { check } = require('express-validator')
const checkEntries = [
    check('entry.surname').isAlpha(),
    check('entry.name').isAlpha(),
    check('entry.email').isEmail(),
    check('entry.phone').isNumeric(),
    check('entry.company').isLength({ min : 1 }),
    check('entry.signature').isLength({ min : 1 }),
    check('entry.series').isAlpha(),
    check('entry.number').isNumeric(),
    check('entry.duration').isLength({min : 2}),
]
module.exports = {
    checkEntries
}