const database = require ('../users/database')
const bcrypt = require('bcrypt')
const { MESSAGES: { USER_NOT_FOUND, AUTH_SUCCESS, INCORRECT_PASS }, EXP_TIME} = require('../../utils/constants')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

module.exports = {
    login : async user => {
        const userFound = await database.getByEmail(user.email)
       
        if(userFound === null){
            return Helpers.handleResponse(USER_NOT_FOUND, StatusCodes.FORBIDDEN)
        }
        else if(bcrypt.compareSync(user.password, userFound.password)){
            
            let token = jwt.sign({
                user: userFound
            }, 'secret', { expiresIn: EXP_TIME })

            return {userFound, token} 
        }  
        else{
            return Helpers.handleResponse(INCORRECT_PASS, StatusCodes.FORBIDDEN)
        }
    }
}
