const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');
const database = require('../../api/users/database')
const {StatusCodes} = require('http-status-codes')
const Helpers = require('../../utils/helpers')
const CONSTANTS = require('../../utils/constants')

module.exports = {
    sendEmail : async email => {

      let findUser = await database.getByEmail(email)

      if(findUser === null)
        return Helpers.handleResponse(CONSTANTS.MESSAGES.USER_NOT_FOUND, StatusCodes.FORBIDDEN)

      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: 'mdduperjalbtlv65@ethereal.email',
          pass: 'AjPmqn2AQXRGzWd4eM', 
        },
      });

      let token = jwt.sign({
        email: email,
        id: findUser._id
      }, 'secret', { expiresIn: EXP_TIME });
  
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email, 
        subject: "Hello ✔",
        text: "Pentru a reseta parola apasati pe acest link", 
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