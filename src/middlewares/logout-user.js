

async function LogoutUser(request, response, next){

  if (request.session.isLoggedIn){
    return await request.session.destroy(error=>{
      if (error) {
        return response.redirect("/server-error");
      }
      return response.redirect("/");
    });
  }
  next();
}

module.exports = LogoutUser;
