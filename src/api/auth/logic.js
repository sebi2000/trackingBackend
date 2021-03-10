const database = require ('../users/database')
const bcrypt = require('bcrypt')
const { MESSAGES: { USER_NOT_FOUND, AUTH_SUCCESS, INCORRECT_PASS } } = require('../../utils/constants')

let error = { 
    status: "",
    code: ""
}

function handleError (status, code) {
    error.status = status
    error.code = code
    return error
}

module.exports = {
    login : async user => {
        const userFound = await database.getByEmail(user.email)
        if(userFound === null){
            return handleError(USER_NOT_FOUND, 403)
        }
        else if(bcrypt.compareSync(user.password, userFound.password)){
            return handleError(AUTH_SUCCESS, 202)
        }  
        else{
            return handleError(INCORRECT_PASS, 403)
        }
    }
}
