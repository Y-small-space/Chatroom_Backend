const express = require('express');
const router = express.Router();
const User = require('../../models/User/index');

// 处理好友搜索的POST请求
router.get('/search/:searchUser', async (req, res) => {
    try {
        const phoneNumber = req.params.searchUser;
        console.log(phoneNumber);
        const allUserMessage = await User.findOne({ phoneNumber });
        res.json(allUserMessage);
    } catch (error) {
        console.error('搜索好友失败', error);
        res.status(500).json({ error: '搜索好友失败' })
    }
})

module.exports = router