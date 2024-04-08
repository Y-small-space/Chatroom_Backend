const express = require('express');
const router = express.Router();
const User = require('../../models/User/index');
const authenticateJWT = require('../../middlewares/authenticateJWT');
const crypto = require('crypto');

// 生成哈希函数
function generateETag(user) {
  // 将用户信息序列化为字符串
  const userString = JSON.stringify(user);
  // 使用 SHA-1 哈希函数计算哈希值
  const hash = crypto.createHash('sha256'); // 选择哈希算法为SHA-256
  hash.update(userString); // 更新哈希内容
  return hash.digest('hex'); // 返回十六进制表示的哈希值
}

router.post('/setprofile', authenticateJWT, async (req, res) => {

  console.log('====================================');
  console.log(req.body.profileData.phoneNumber);
  console.log('====================================');
  const profileData = req.body.profileData;
  const phoneNumber = profileData.phoneNumber;
  console.log(phoneNumber);

  try {
    const existingUser = await User.findOne({ phoneNumber: phoneNumber });
    console.log(existingUser);

    if (existingUser) {
      // Update user profile
      existingUser.email = profileData.email;
      existingUser.occupation = profileData.occupation;
      existingUser.roomId = profileData.cid;
      existingUser.birthday = profileData.birthday;
      existingUser.gender = profileData.gender;

      const updatedUser = await existingUser.save();

      res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/showprofile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const phoneNumber = userId;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 检查客户端是否发送了If-None-Match头
    const clientETag = req.headers['if-none-match'];
    const userETag = generateETag(user); // 根据用户信息生成ETag

    // 如果客户端发送了匹配的ETag，则返回304 Not Modified
    if (clientETag === userETag) {
      return res.status(304).end();
    }

    // 设置响应头
    res.set('Cache-Control', 'public, max-age=3600'); // 设置缓存控制头，告诉客户端缓存1小时
    res.set('ETag', userETag); // 设置ETag头，用于下次请求的缓存验证

    // 返回用户信息
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;