const mongoose  = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

exports.CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jeul6.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority`;

exports.connectToDB = async (callback)=>{
  try{
    console.log(this.CONNECTION_STRING);
    await mongoose.connect(this.CONNECTION_STRING);
    console.log("Connected to DB");
    callback();
  }catch(error){
      error.message = "Can not connect to DB. Try Again later!";
      error.statusCode = 500;
      throw error;
  }
}

exports.sessionStore = ()=>{
  return new MongoDBStore({
    uri: this.CONNECTION_STRING,
    collection: "Sessions",
  })
}
