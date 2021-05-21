const jwt = require('jsonwebtoken')
const database = require('../../api/users/database')
const {StatusCodes} = require('http-status-codes')
const Helpers = require('../../utils/helpers')
const CONSTANTS = require('../../utils/constants')
const { createTransporter, } = require('../../utils/services')
const fs = require('fs')
const path = require('path')

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

      let htmlContent = fs.readFileSync(path.join(__dirname, '..', '..', 'utils', 'html-templates', 'resetPassword.html'))
  
      let info = await transporter.sendMail({
        from: 'Solvvo Info',
        to: email, 
        subject: "[SOLVVO] Modificare parolă",
        html: Helpers.simpleHtmlTemplating(htmlContent.toString(),{
          accountName:  findUser.name,
          accountEmail: findUser.email,
          resetLink: `http://localhost:3000/reset/${token}/${findUser._id}`
      })
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