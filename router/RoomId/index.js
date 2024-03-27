const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const ChatRoom = require('../../models/ChatRoom');

router.post('/roomId', async (req, res) => {
    try {
        console.log(req.body);
        const { userId1, userId2 } = req.body;
        const user1 = await User.findOne({ phoneNumber: userId1 });
        const user2 = await User.findOne({ phoneNumber: userId2 });

        if (!user1 || !user2) {
            return res.status(404).json({ error: '用户不存在' });
        }

        const chatroom = await ChatRoom.findOne({
            users: { $all: [user1._id, user2._id] }
        });

        if (!chatroom) {
            const roomId = user1._id + user2._id;

            const newChatRoom = new ChatRoom({
                roomId,
                users: [user1._id, user2._id]
            })

            const savedChatRoom = await newChatRoom.save()

            res.json({ roomId: roomId });
        } else {
            const roomId = chatroom.roomId;
            res.status(200).json({ roomId });
        }
    } catch (error) {
        console.error('获取房间ID时出错：', error);
        res.status(500).json({ error: '获取房间ID时出错' });
    }
});

module.exports = router;
