const mongoose = require("mongoose");
const User = require("./Schema/UserSchema");
const Event = require("./Schema/Events");
const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const multer = require("multer");

const { storage } = require("./firebase.js");
// import { getStorage, ref, uploadBytes } from "firebase/storage";
const { getStorage, ref, uploadBytes,getDownloadURL } = require("firebase/storage");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

//creating database connection
mongoose
  .connect("mongodb://0.0.0.0:27017/event-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection sucessfull!!"))
  .catch((err) => console.log(err));

// adding new user
// const user = new User({
//   username: "khan",
//   email: "khan@gmail.com",
//   password: "alex",
// });
// user.save().then(() => console.log(user));

//adding new event
// const event = new Event({eventname:"Chess",eventdescription:"chess tournament by IS department",eventimages:[],eventauthor:"tejas"})
// event.save().then(()=>console.log(event))

//helper function to create user
async function createUser(username, email, password) {
  const user = new User({
    username,
    email,
    password,
  });

  // const result = await user.save();
  // console.log(result);
}

// createUser("elon","elon@gmail.com","elon123",)
//("6395db2843b4a770a41c980e") elon user id
//helper function to create events
async function createEvent(eventname, eventdescription, eventimages, host) {
  const event = new Event({
    eventname,
    eventdescription,
    eventimages,
    host,
  });

  // const result = await event.save();
  // console.log(result);
}
// createEvent("chess","Chess Classic matches, 3 rounds",[],"6395db2843b4a770a41c980e")

// list all events
// async function listEvents() {
//   const events = await Event.find().populate("host").select("");
//   console.log(events);
// }

// listEvents();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//login post route
app.post("/login", async (req, res) => {
  const name = req.body.username;
  const password = req.body.password;
  //find the user with the username in db
  const user = await User.findOne({ username: name });
  const hashedpassword = await bcrypt.compare(password, user.password);
  try {
    if (user == null || hashedpassword != true) {
      //if no user found or password is incorrect
      res
        .status(404)
        .send({ message: "Invalid Username or Password. Try Again!" });
      //redirect to register
      //   res.status(200).redirect("/register");
    } else {
      console.log(user);
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Error Occured" });
  }
});

//sign-up get route
app.get("/register", (req, res) => {
  //render form to login
  res.send("login");
});

//sign-up post route
app.post("/register", async (req, res) => {
  //getting new user data
  password = req.body.password;
  //const hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);
  const hashedpassword = await bcrypt.hash(password, 4);
  const userData = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedpassword,
  });

  userData.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server error" });
      //   redirect to signup again
    } else {
      res.status(200).send(userData);
      console.log("done");
    }
  });
});

//host-event route
app.post("/addevent", async (req, res) => {
  const eventData = new Event({
    eventname: req.body.eventname,
    eventdescription: req.body.eventdescription,
    eventimages: [],
    host: req.body.host, //"6395db2843b4a770a41c980e" elon id
  });
  eventData.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server error" });
      //   redirect to signup again
    } else {
      res.status(200).send(eventData);
      console.log("done");
    }
  });
});

//update event
// a request "/foo/4" to route /foo/:id has URL path params { id: 4 }
app.post("/editevent/:id", async (req, res) => {
  const id = req.params.id;
  // const { id } = req.params;
  //   const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
  const eventData = await Event.findByIdAndUpdate(id, {
    $set: {
      eventname: req.body.eventname,
      eventdescription: req.body.eventdescription,
      eventimages: [],
      host: req.body.host,
    },
  });
  console.log(eventData);
  eventData.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server error" });
      //   redirect to signup again
    } else {
      res.status(200).send(eventData);
      console.log("done");
    }
  });
});

<<<<<<< HEAD
//firebase
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

//post route demo
app.post("/addimage", upload.single("image"), async (req, res) => {
  const file = req.file;
  // console.log(file);
  const storageRef = ref(storage, "images/" + file.originalname);
  console.log(file);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  try {
    await uploadBytes(storageRef, file.buffer, metatype).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
      res.status(200).send({ message: "sent" });
    });
  } catch (error) {
    console.log(error);
    uploadTask.cancel(); //cancle previous half upload
    res.status(401).send({ message: "error" });
  }
});

//get route 

=======
//delete route
app.post("/deleteevent/:id", async (req,res)=>{
    const id=req.params.id;
    Event.deleteOne({_id:id},function (err,found){  
        if(err){
          console.log("err");
        }
        else {
            console.log("deleted");
        }
    })
})
>>>>>>> 04c7aa5b14392cbbb562f4b4c4df2fe9efdeef4b

//running port
app.listen(3000, () => {
  console.log("sever connected to port 3000");
});
