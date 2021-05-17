const database = require('./database')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../../utils/constants')
const { hashPass } = require('../../utils/helpers')
const { createTransporter } = require('../../utils/services')
const generator = require('generate-password')

module.exports = {
    getAll: () => database.getAll(),
    create: async user => {

        let password = generator.generate({
            length: 10,
            numbers: true
        });

        user.password = hashPass(password)

        let transporter = createTransporter()

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', 
            to: "bar@example.com, baz@example.com", 
            subject: "Hello ✔", // Subject line
            html: `Contul dumneavoastra este: <br> Email: ${user.email} <br> Password: ${password} <br> <b>Va puteti schimba parola daca doriti</b>`, 
          });
          
        return database.create(user)
    },
    getById: id => database.getById(id),
    update: (id, user) => {
        if(user.password !== undefined)
            user.password = hashPass(user.password)
        
       return database.update(id, user)
    }
}