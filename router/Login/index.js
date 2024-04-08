const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/User/index');
const jwt = require('jsonwebtoken');
const secreKey = 'JSistheBEst';

router.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;
    console.log('login', phoneNumber, password);

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(401).json({ error: '用户不存在' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    phoneNumber: user.phoneNumber
                },
                secreKey,
                { expiresIn: '1h' }
            );
            res.status(200);
            res.header('Authorization', `Bearer ${token}`);
            res.json({ message: '登录成功' });
            console.log('login');
        } else {
            res.status(401).json({ error: '密码不正确' });
            console.log('password error');
        }
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({ error: '登录失败' });
    }
});

module.exports = router;
