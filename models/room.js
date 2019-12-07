const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({

    title: {type:String, required: true},
    price: {type:String, required: true},
    description: {type:String},
    location: {type:String, required: true},
    image: {type:String}

    
})

const RoomInfo = mongoose.model('RoomInfo',RoomSchema );

module.exports = RoomInfo;