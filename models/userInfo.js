const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');



const userSchema = new Schema({

    email: {type:String, required: true},
    firstname: {type:String, required: true},
    lastname: {type:String, required: true},
    password: {type:String, required: true},
    //password2: {type:String, required: true},
    birthday: {type:Date, required: true},
    
})

// hashing/salting before saving the new object to DB

userSchema.pre("save", function(next){
    bcrypt.genSalt(10)
    .then(salt=>{
        bcrypt.hash((this.password), salt)
        .then(hash=>{
            this.password=hash;
            next();
        })
    })
})


const UserInfo = mongoose.model('UserInfo',userSchema );

module.exports = UserInfo;