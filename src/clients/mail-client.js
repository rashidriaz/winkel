const api_key = 'f6d56a5ee8d288b12f26ad6522fcadd4-8d821f0c-f9a02ae7';
const domain = 'sandbox25410413ec16415682d7a47654cc9f64.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports.sendMail = (mail, callback)=>{
  if (!mail)throw new Error("Mail is required");
  mailgun.messages().send(mail, callback);
};
