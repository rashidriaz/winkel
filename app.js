//-----------------Package Imports--------------------------//
const Express = require("express");
const BodyParser = require("body-parser");
const Flash = require("connect-flash")
const session = require("express-session");
//-----------------Custom Imports--------------------------//
const dbClient = require("./src/clients/database-client");
const path = require("path");
const authRoutes = require("./src/routes/auth");
const sellerRoutes = require("./src/routes/seller");
const shopRoutes = require("./src/routes/shop");
const errorRoutes = require("./src/routes/error");
const FileUpload = require("./src/services/file-upload");
const  FetchSessionUser = require("./src/middlewares/fetch-session-user");
//===========================================================

const app = Express();
let isDBConnected = false;

//----------------------Function Declaration-----------------
const dbNotConnected = (request, response, next)=>{
  if (!isDBConnected){
    response.redirect("/server-error");
  }
  next();
}
function extractFlashMessage(request, key){
  return request.flash(key).pop();
}
//===================MIDDLEWARE REGISTRATION=================
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(BodyParser.urlencoded({extended: false}));
app.use(session({secret: "nkjcanwrjfk/lkfeff3r../;fewklfp]pfl!@###$R°nfdjenf",
  resave: false, saveUninitialized: false, store: dbClient.sessionStore()}));
app.use(FetchSessionUser);
app.use(FileUpload());
app.use(Flash());
app.use(Express.static(path.join(__dirname, 'src/public')));
app.use(Express.static(path.join(__dirname, 'images')));
app.use(dbNotConnected);

app.use((request, response, next)=>{
  response.locals.isLoggedIn = request.session.isLoggedIn;
  response.locals.error = extractFlashMessage(request, "error");
  response.locals.success = extractFlashMessage(request, "success");
  next();
});

//------------------- Routes-----------------------------------//

app.use(authRoutes);
app.use("/seller", sellerRoutes);
app.use(shopRoutes);
app.use("/error", errorRoutes);

try{
  app.listen(4000);
  dbClient.connectToDB(()=>{
    isDBConnected = true;
  });
}catch(error){
  console.log(error.message);
}
