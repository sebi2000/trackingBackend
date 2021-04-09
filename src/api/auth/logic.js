const database = require ('../users/database')
const bcrypt = require('bcrypt')
const { MESSAGES: { USER_NOT_FOUND, AUTH_SUCCESS, INCORRECT_PASS }, CODES: { ACCESS, FORBIDDEN} } = require('../../utils/constants')
const Helpers = require('../../utils/helpers')

module.exports = {
    login : async user => {
        const userFound = await database.getByEmail(user.email)
        if(userFound === null){
            return Helpers.handleResponse(USER_NOT_FOUND, FORBIDDEN)
        }
        else if(bcrypt.compareSync(user.password, userFound.password)){
            return Helpers.handleResponse(AUTH_SUCCESS, ACCESS)
        }  
        else{
            return Helpers.handleResponse(INCORRECT_PASS, FORBIDDEN)
        }
    }
}
