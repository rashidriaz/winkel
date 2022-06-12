const crypto = require("crypto");

function generateToken(resolve, reject){
  crypto.randomBytes(32,(error, buffer)=>{
    if (error) {
      reject(error);
    }else{
      resolve(buffer.toString("hex"));
    }
  });
}

module.exports.generateResetPasswordToken = ()=>{
  return new Promise((resolve, reject)=>{
    generateToken(resolve, reject);
  });
}

module.exports.generateEmailConfirmationToken = ()=>{
  return new Promise((resolve, reject)=>{
    generateToken(resolve, reject);
  });
}
