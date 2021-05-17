const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')
const database = require('../../api/users/database')
const {StatusCodes} = require('http-status-codes')
const Helpers = require('../../utils/helpers')
const CONSTANTS = require('../../utils/constants')
const { createTransporter } = require('../../utils/services')

module.exports = {
    sendEmail : async email => {

      let findUser = await database.getByEmail(email)

      if(findUser === null)
        return Helpers.handleResponse(CONSTANTS.MESSAGES.USER_NOT_FOUND, StatusCodes.FORBIDDEN)

      let transporter = createTransporter()

      let token = jwt.sign({
        email: email,
        id: findUser._id
      }, 'secret', { expiresIn: CONSTANTS.EXP_TIME });
  
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email, 
        subject: "Hello ✔",
        html: `Pentru a reseta parola apasati pe acest <a href='http://localhost:3000/reset/${token}/${findUser._id}'>link</a>`, 
      });

      return Helpers.handleResponse(CONSTANTS.MESSAGES.AUTH_SUCCESS, StatusCodes.OK)
    },

    verifyToken : async token => {

      try{
          let decoded = jwt.verify(token, 'secret')
          return StatusCodes.OK
      }catch(err) {
          return StatusCodes.FORBIDDEN
      }

    }
}