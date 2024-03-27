const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User/index')

router.post('/register', async (req, res) => {
    const { phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
        return res.status(400).json({ error: '用户已经注册！' })
    }

    bcrypt.hash(password, 10, async (err, hashPassword) => {
        if (err) {
            console.error('密码哈希错误：', err);
            return res.status(500).json({ error: '用户注册失败' });
        }

        const newUser = new User({
            phoneNumber,
            password: hashPassword
        });

        try {
            await newUser.save();
            res.json({ success: true, message: '用户注册成功！' });
            console.log('register success');
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: '用户注册失败'
            })
        }
    })
})



module.exports = router