const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookRoomSchema = new Schema({
  userInfo: {
    type: Schema.ObjectId,
    ref: 'UserInfo',
  },
  roomInfo: {
    type: Schema.ObjectId,
    ref: 'RoomInfo',
  }
  
});

const BookedRooms = mongoose.model('BookedRooms', bookRoomSchema);

module.exports = BookedRooms;