const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    avatar: { type: String },
    roomId: { type: String },
    gender: { type: String },
    occupation: { type: String },
    birthday: { type: Date },
    friends: [{
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        remark: { type: String },
        phoneNumber: { type: Number },
        email: { type: String },
        avatar: { type: String },
        roomId: { type: String },
        gender: { type: String },
        occupation: { type: String },
        birthday: { type: Date }
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User