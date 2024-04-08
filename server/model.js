const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

userSchema.set("versionKey",false)

const users = mongoose.model('userlogins',userSchema)
module.exports = {users}