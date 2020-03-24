const sgMail = require('@sendgrid/mail')


sgMail.setApiKey( process.env.SENDGRID_API_KEY)

const sendEmailWelcome = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'ofirfiv@gmail.com',
        subject: 'Welcome!',
        text: `Welcome ${name},  Ready to get started?`
    })
}
const sendEmailCancaltion = (email, name) =>{
    sgMail.send({
        to:email,
        from:'ofirfiv@gmail.com',
        subject:'right before you leave!',
        text:`we would love to hear from you ${name} why did you leave us?`
    })
}

module.exports={
    sendEmailWelcome,
    sendEmailCancaltion
}