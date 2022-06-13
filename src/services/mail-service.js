const mailClient = require("../clients/mail-client");

function generateMailBody(mailData){
  return `
    <div style="margin: auto; width: 100%; text-align: center">
        <img src="https://winkel-app.herokuapp.com/images/logo.png" height="50px" width="50px">
        <h3>${mailData.title}</h3>
    </div>
    <hr>
    <div class="content">
    <p>Hi!</p>
    <br>
    <p>${mailData.contentTitle}</p>
    <br>
    <p>To ${mailData.purpose}, click on the button below</p>
    <a href="${mailData.url}"
     style="padding: 0.5rem; background: #2828a7; color: #fff;font-size: large; text-decoration: none; border: solid 1px #101031; border-radius: 5px;">
     ${mailData.purpose}</a>
     <br>
     <p>Or copy and paste the follwing url into your browser</p>
     <a href="${mailData.url}">${mailData.url}</a>
</div>
    
    `;
}
module.exports.sendResetPasswordMail = (mailData, callback)=>{
  mailData.url = process.env.URL + mailData.token;
  console.log(mailData.token);
  mailData.title = "Password Reset";
  mailData.contentTitle = "Forgot your Password?";
  mailData.purpose = "Reset Password";
  return mailClient.sendMail(
    {
      from: 'Winkel <support@winkel.com>',
      to: mailData.emailID,
      subject: "Reset Password",
      html:  generateMailBody(mailData),
    }, callback);
}

module.exports.sendEmailIdVerificationMail = (mailData, callback)=>{
  mailData.url = process.env.URL  + mailData.token;
  console.log(mailData.token);
  mailData.title = "Thank You for signing up";
  mailData.contentTitle = "Welcome to Winkel";
  mailData.purpose = "Verify Email Address";
  return mailClient.sendMail(
    {
      from: 'Winkel <support@winkel.com>',
      to: mailData.emailID,
      subject: "Verify your email address",
      html:  generateMailBody(mailData),
    }, callback);
}
