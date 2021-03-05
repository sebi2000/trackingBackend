const database = require ('../users/database')
const bcrypt = require('bcrypt')

module.exports = {
    login : async user => {
        const userFound = await database.getByName(user.name)
        if( userFound === null )
            return "User not found"
        else if(bcrypt.compareSync(user.password, userFound.password))
            return "Authentication was successful"
        else return "Password is incorrect"
    }
}