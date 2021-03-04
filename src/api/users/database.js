const users = require('../../database/models/users')

state={
    admins:[
        {email: "admin@gmail.com",
         password : "admin"}
    ]
}
module.exports = {
    getAll: () => users.find({}).lean().exec(),
    getById: id => users.findById(id).lean().exec(),
    update: (id,user) => users.findByIdAndUpdate(id,user).lean().exec(),
    create: user => users.create(user) 
}
