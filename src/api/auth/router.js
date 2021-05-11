const express = require('express')
const router = express.Router()
const logic = require('./logic')
const { validationResult } = require('express-validator')
const { checkLogin } = require('../../utils/validation/auth')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router.route('/')
    .post(checkLogin, (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
        else logic.login(req.body.user).then(resp => {
            if(resp.userFound)
                req.session.user = req.body.user
            res.send(resp)
        })
        .catch(err =>{
            res.json(err)
            res.status(404)
        })
    })

module.exports = router