const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const User = require('../../models/User');
const fs = require('fs');

const uploadFolder = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'avatar-' + Date.now() + ext);
  }
});

const maxSizeInBytes = 2 * 1024 * 1024;

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSizeInBytes }
});

router.post('/upload-avatar/:userId', upload.single('avatar') , async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '未提供有效的文件' });
    }

    const avatarPath = req.file.path;
    const userId = req.params.userId;

    const user = await User.findOne({ phoneNumber: userId });
    if (!user) {
      return res.status(404).json({ error: '找不到用户' });
    }

    const relativePath = avatarPath.substring(avatarPath.lastIndexOf('/uploads'));
    user.avatar = relativePath;
    await user.save();

    res.json({ message: '头像上传成功', avatarPath });
  } catch (error) {
    console.error('头像上传失败：', error);
    res.status(500).json({ error: '头像上传失败' });
  }
});

module.exports = router;