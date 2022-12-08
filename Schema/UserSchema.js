const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: 'string',
    email: 'string',
    password: 'string',
})

module.exports = mongoose.model("Users", UserSchema)