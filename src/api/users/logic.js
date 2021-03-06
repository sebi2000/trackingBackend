const database = require('./database')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../../utils/constants')
const { hashPass, simpleHtmlTemplating } = require('../../utils/helpers')
const { createTransporter } = require('../../utils/services')
const generator = require('generate-password')
const fs = require('fs')
const path = require('path')

module.exports = {
    getAll: (page, rows) => Promise.all([database.getAll(page, rows), database.count()]),
    delete: id => database.delete(id),
    create: async user => {

        let password = generator.generate({
            length: 10,
            numbers: true
        });

        user.password = hashPass(password)

        let transporter = createTransporter()

        let htmlContent = fs.readFileSync(path.join(__dirname, '..', '..', 'utils', 'html-templates', 'createAccount.html'))
       
        try{
            await transporter.sendMail({
                from: 'Solvvo Info', 
                to: user.email, 
                subject: "[SOLVVO] Cont nou", // Subject line ,
                attachments: [{
                    filename: 'helpdesk_logo.png',
                    path: path.join(__dirname, '..', '..', 'assets', 'weSolvvoLogoMotto.png'),
                    cid: 'uniqueLogoSrc'
                }],
                html: simpleHtmlTemplating(htmlContent.toString(),{
                    accountName:  user.name,
                    accountEmail: user.email,
                    accountPassword: password,
                    logoSrc: 'uniqueLogoSrc'
                })
            })
        }catch(err){
            console.error(err)
            return {}
        }
        
        return database.create(user)
    },
    getById: id => database.getById(id),
    update: (id, user) => {
        if(user.password !== undefined)
            user.password = hashPass(user.password)
        
       return database.update(id, user)
    }
}