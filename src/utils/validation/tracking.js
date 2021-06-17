const { check } = require('express-validator')
const checkTracking = [
  check('tracking.surname').isAlpha(),
  check('tracking.name').isAlpha(),
  check('tracking.action').not().isEmpty(),
  check('tracking.table').not().isEmpty(),
]

module.exports = {
  checkTracking,
}
