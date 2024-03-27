const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const authenticateJWT = require('../../middlewares/authenticateJWT');

router.post('/addFriends', authenticateJWT, async (req, res) => {
    try {
        const { userIdToAdd } = req.body;
        const { currentUserId } = req.body;

        console.log(userIdToAdd, currentUserId);

        // 查找当前用户和要添加的好友
        const currentUser = await User.findOne({ phoneNumber: currentUserId });
        const friendToAdd = await User.findOne({ phoneNumber: userIdToAdd });

        if (!friendToAdd || !currentUser) {
            return res.status(404).json({ error: '用户不存在' });
        }

        if (currentUser.friends.some((item) => item.phoneNumber === userIdToAdd)) {
            return res.status(400).json({ error: '好友已存在' });
        }

        const { password, friends, ...friendInfo } = friendToAdd._doc;
        currentUser.friends.push(friendInfo);

        const { password2, friends2, ...friendInfo2 } = currentUser._doc;
        friendToAdd.friends.push(friendInfo2);
        await currentUser.save();
        await friendToAdd.save();

        res.status(200).json({ message: '成功添加好友' });
    } catch (error) {
        console.error('添加好友失败', error)
        res.status(500).json({ error: '添加好友失败' });
    }
})

module.exports = router
