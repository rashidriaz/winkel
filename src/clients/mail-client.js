const api_key = `${process.env.MAIL_CLIENT_API_KEY}`;
const domain = `${process.env.MAIL_CLIENT_DOMAIN}`;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports.sendMail = (mail, callback)=>{
  if (!mail)throw new Error("Mail is required");
  mailgun.messages().send(mail, callback);
};
