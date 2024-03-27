const express = require('express');
const ChatRoom = require('../../models/ChatRoom');
const router = express.Router();

const User = require('../../models/User');

router.post('/createRoom', async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;
        const user1 = await User.findOne({phoneNumber:userId1});
        const user2 = await User.findOne({phoneNumber:userId2});


        const chatroom = await ChatRoom.findOne({
            users: { $all: [user1._id, user2._id] }
        });

        if (chatroom) {
            const roomId = chatroom.roomId;
            res.json({ roomId });
        } else {
            const roomId = uuidv();

            const newChatRoom = new ChatRoom({
                roomId,
                users: [user1._id, user2._id]
            })

            const savedChatRoom = await newChatRoom.save()

            res.json({ roomId });
        }
        console.log("chatroom create successfully")
    } catch (error) {
        console.error('处理请求时出错：',error);
        res.status(500).json({error:'处理请求时出错！'});
    }
})

module.exports = router;