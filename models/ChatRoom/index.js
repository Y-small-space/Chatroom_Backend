const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    roomId:{
        type:String,
        unique:true,
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const ChatRoom = mongoose.model('ChatRoom',chatRoomSchema);

module.exports = ChatRoom;