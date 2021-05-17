const {getById} = require('../api/users/logic')
const jwt = require('jsonwebtoken')

module.exports ={
authHandler: async (req, res, next) => {
    let auth = req.headers.authorization
    console.log(auth)
    if(!auth)
      res.send("ERROR")
  
    token = auth.substr(auth.indexOf(' ') + 1)
    let decoded
  
    try{
      decoded = jwt.verify(token, 'secret')
      req.auth = decoded
    }catch(err) {
      res.send(err)
    }
    console.log(decoded)
    let user = await getById(decoded.user._id)
   
    if(user !== null)
      next()
    else res.send('User not found')
    
  }

}
 