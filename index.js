const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//const db = "mongodb+srv://TejasN:<password>@cluster0.4dggq3i.mongodb.net/mangement?retryWrites=true&w=majority"

try {
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
        console.log("connected"));
} catch (error) {
    console.log("could not connect");
}

app.listen(3000, () => {
    console.log("sever connected to port 3000");
})