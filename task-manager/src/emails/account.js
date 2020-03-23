const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

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