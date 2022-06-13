//-----------------Package Imports--------------------------//
const Express = require("express");
const BodyParser = require("body-parser");
const Flash = require("connect-flash")
const session = require("express-session");
const Helmet = require("helmet");
const Compression = require("compression");
const Morgan = require("morgan");
const fs = require("fs");
const https = require("https");
//-----------------Custom Imports--------------------------//
const dbClient = require("./src/clients/database-client");
const path = require("path");
const authRoutes = require("./src/routes/auth");
const sellerRoutes = require("./src/routes/seller");
const shopRoutes = require("./src/routes/shop");
const errorRoutes = require("./src/routes/error");
const FileUpload = require("./src/services/file-upload");
const FetchSessionUser = require("./src/middlewares/fetch-session-user");
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {flags: "a"});
//===========================================================

const app = Express();
let isDBConnected = false;
const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');
//----------------------Function Declaration-----------------
const dbNotConnected = (request, response, next) => {
  if (!isDBConnected) {
    response.redirect("/server-error");
  }
  next();
}

function extractFlashMessage(request, key) {
  return request.flash(key).pop();
}

//===================MIDDLEWARE REGISTRATION=================
app.use(Morgan("combined", {stream: accessLogStream}));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(BodyParser.urlencoded({extended: false}));
app.use(session({
  secret: "nkjcanwrjfk/lkfeff3r../;fewklfp]pfl!@###$R°nfdjenf",
  resave: false, saveUninitialized: false, store: dbClient.sessionStore()
}));
app.use(FetchSessionUser);
app.use(FileUpload());
app.use(Flash());
app.use(Helmet({contentSecurityPolicy: false,}));
app.use(Compression());
app.use(Express.static(path.join(__dirname, 'src/public')));
app.use(Express.static(path.join(__dirname, 'images')));
app.use(dbNotConnected);

app.use((request, response, next) => {
  response.locals.isLoggedIn = request.session.isLoggedIn;
  response.locals.url = process.env.URL;
  response.locals.error = extractFlashMessage(request, "error");
  response.locals.success = extractFlashMessage(request, "success");
  next();
});

//------------------- Routes-----------------------------------//

app.use(authRoutes);
app.use("/seller", sellerRoutes);
app.use(shopRoutes);
app.use("/error", errorRoutes);

try {
  app.listen(process.env.PORT || 4000);
  dbClient.connectToDB(() => {
    isDBConnected = true;
  });
} catch (error) {
  console.log(error.message);
}
