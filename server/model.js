const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

userSchema.set("versionKey",false)

const users = mongoose.model('userlogins',userSchema)

const adminSchema = new mongoose.Schema({
    adminName:String,
    adminEmail:String,
    adminPassword:String,
})
adminSchema.set("versionKey",false)

const admins = mongoose.model("adminlogins",adminSchema)
const chefSchema = new mongoose.Schema({
    chefName:String,
    chefEmail:String,
    chefPassword:String,
})
chefSchema.set("versionKey",false)

const chefs = mongoose.model("cheflogins",chefSchema)
const dishSchema = new mongoose.Schema({
    dishName:String,
    dishCategory:String,
    dishLink:String,
    dishPrice:String,
})
dishSchema.set("versionKey",false)
const dishes = mongoose.model("alldishes",dishSchema)

module.exports = {users,admins,dishes,chefs}