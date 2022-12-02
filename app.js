const mongoose = require("mongoose");
const User = require("./Schema/UserSchema");

//creating database connection
mongoose.connect("mongodb://0.0.0.0:27017/event-management", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("connection sucessfull!!"))
.catch((err)=>console.log(err));

//adding new user
const user = new User({username:"elon", email: "elon@gmail.com", password:"elon"})
user.save().then(()=>console.log(user))

