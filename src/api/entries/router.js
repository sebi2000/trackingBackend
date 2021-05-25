const express = require('express')
const router = express.Router()
const logic = require('./logic')
const { validationResult } = require('express-validator')
const { checkEntries } = require('../../utils/validation/entries')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router.route('/')
    .get((req, res) => {
        logic.getAll(req.query.page, req.query.rows, req.query.start, req.query.end).then(response => {
            res.json(response)
        }).catch(err => {
            res.send(err)
        })
    })

router.route('/:ID')
    .delete((req, res) =>{
        logic.delete(req.params.ID).then(entry =>{
            res.send(entry)
        }).catch(err =>{
            res.send(err)
        })
    })
    .put((req, res) =>{
        logic.update(req.params.ID, req.body).then(entry =>{
            res.send(entry)
         }).catch(err => {
             res.send(err)
         })
    })
    
module.exports = router