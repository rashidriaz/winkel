const bcrypt = require("bcryptjs");

module.exports.encryptPassword = async(password)=>{
  return await bcrypt.hash(password, 12);

}

module.exports.comparePassword = async(data)=>{
  return bcrypt.compare(data.password, data.hashedPassword);
}
