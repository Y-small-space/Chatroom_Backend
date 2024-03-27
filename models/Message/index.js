const mongoose = require('mongoose');
const { Schema } = mongoose

const messageSchema = new mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' }, // 发送者的ID
    receiver: { type: Schema.Types.ObjectId, ref: 'User' }, // 接收者的ID
    sender_username: String,
    receiver_username: String,
    content: String, // 消息内容
    timestamp: Date, // 时间戳
    roomId: String,
    avatar_sender: String,
    avatar_receiver: String
});

const Message = mongoose.model('Message', messageSchema)

module.exports = Message