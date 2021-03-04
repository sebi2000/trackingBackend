const database = require ('../users/database')
const bcrypt = require('bcrypt')

module.exports = {
    validatePass: (passwordSent, passwordUser) => {
        if(bcrypt.compareSync(passwordSent, passwordUser))
            return "Authentication was successful"
        return "Password is incorrect"
    },
    getByName: user => database.getByName(user.name)  
}