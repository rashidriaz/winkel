const UserService = require("../services/modal-service/user-service");

async function fetchSessionUser(request, response, next){
  if(!request.session.userID){
    return next();
  }
  try {
    request.user = await UserService.findByID(request.session.userID);
    next();
  }catch(error){
    throw new Error(error);
  }
}

module.exports = fetchSessionUser;
