const express = require('express')
const router = express.Router()
const logic = require('./logic')
const logicUsers = require('../users/logic')

router.route('/').post((req, res) => {
  logic.sendEmail(req.body.email).then((resp) => {
    res.send(resp)
  })
})
router.route('/:TOKEN').get((req, res) => {
  logic.verifyToken(req.params.TOKEN).then((resp) => {
    res.json(resp)
  })
})
router.route('/:ID').put((req, res) => {
  logicUsers
    .update(req.params.ID, req.body)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(400)
      res.send(err)
    })
})

module.exports = router
