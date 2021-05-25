const nodemailer = require('nodemailer')
const {getAllByDate, count} = require("../api/entries/database")

const createTransporter = () => {
    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: 'mdduperjalbtlv65@ethereal.email',
          pass: 'AjPmqn2AQXRGzWd4eM', 
        },
      });
}

const sendEmailToAdmin = async () => {
    let transporter = createTransporter()

    let date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)

    let array = await getAllByDate(date)

    let message=`<table style="border: 1px solid black"> <tr style="color: blue; background-color: aqua"> <th style="margin: 10px">Nume</th> <th>Prenume</th> <th>Email</th> <th>Data intrare</th> <th>Companie</th> <th>Numar telefon </th> </tr>`
      array.map((item, index)=>{
        message = message +
       `<tr style="padding: 5px"> <th>${item.surname}</th> <th>${item.name}</th> <th>${item.email}</th> <th>${item.date.toUTCString()}</th> <th>${item.company}</th> <th>${item.phone}</th> </tr>`
      })
      message = message + "</table>"
    
    let info = await transporter.sendMail({
        from: 'Solvvo Info',
        to: 'admin@yahoo.com', 
        subject: "[SOLVVO] Intrări",
        html: message, 
      });
}

module.exports = {
    createTransporter : () => createTransporter(),
    sendEmailToAdmin : () => sendEmailToAdmin()
}