const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {type:String, required: true},
    firstname: {type:String, required: true},
    lastname: {type:String, required: true},
    password: {type:String, required: true},
    birthday: {type:Date, required: true},
    
})

const UserInfo = mongoose.model('UserInfo',userSchema );

module.exports = UserInfo;