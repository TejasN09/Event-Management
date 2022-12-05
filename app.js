const mongoose = require("mongoose");
const User = require("./Schema/UserSchema");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine","ejs");

//creating database connection
mongoose.connect("mongodb://0.0.0.0:27017/event-management", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("connection sucessfull!!"))
.catch((err)=>console.log(err));

//adding new user
const user = new User({username:"elon", email: "elon@gmail.com", password:"elon"})
user.save().then(()=>console.log(user))

//sign up Schema
const SignUpSchema = {
    firstName: String,
    lastName: String,
    userId: String,
    email: String,
    password: String
}
//Login Schema
const LoginSchema = {
    email: String,
    password: String
}

//HostSchema
const HostEventSchema = {
    date: {
        type: Date,
        required: true
    },
    eventname: String,
    eventdes: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
}

//creating models
const SighUp = mongoose.model("SignIn", SignUpSchema);

const Login = mongoose.model("Login", LoginSchema);

const HostEvent = mongoose.model("HostEvent", HostEventSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//login post route
app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    SighIn.findOne({ password: password }, (err, found) => {
        if (err) {
            console.log("err")
        }
        else {
            console.log(found);
        }
    })
})


//sign-up post route
app.post("/sign-up", (req, res) => {
    const userData = new SighIn({
        firstName: req.body.fname,
        lastName: req.body.lname,
        userId: req.body.uId,
        email: req.body.email,
        password: req.body.password
    })
    userData.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("done");
        }
    })
})

//host-event route
app.get("/host-event", (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
    res.render("hostevent.ejs");
})

app.post("/host-event", (req, res) => {
    const eventDetails = new HostEvent({
        date: req.body.getdate,
        eventname: req.body.eventname,
        eventdes: req.body.eventdes,
        eventimg: req.body.eventimg
    })

    

    eventDetails.save((err) => {
        if (err) {
            console.log("err");
        } else {
            console.log("working fine");
        }
    })
    console.log(eventDetails.date);
    console.log(eventDetails.eventname);
    console.log(eventDetails.eventdes);
    console.log(eventDetails.eventimg);
    res.render("details.ejs", { eventTitle: eventDetails.eventname , eventDes: eventDetails.eventdes ,dateInfo: eventDetails.date ,eventImg:eventDetails.eventimg});
})

//running port 
app.listen(3000, () => {
    console.log("sever connected to port 3000");
})
