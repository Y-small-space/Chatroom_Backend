const express = require("express")
const Message = require("../../models/Message/index")

const router = express.Router()

const crypto = require('crypto');

// 生成消息内容的哈希值作为ETag
function generateETag(messages) {
  // 取最新的一条消息内容
  const latestMessage = messages[messages.length - 1];
  // 对消息内容进行哈希
  const hash = crypto.createHash('sha256');
  hash.update(latestMessage);
  return hash.digest('hex');
}

router.get('/chatHistory/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // 获取用户的所有聊天历史记录
    const allChatHistory = await Message.find({
      $or: [
        { sender_username: userId },
        { receiver_username: userId }
      ]
    }).exec();

    // 生成ETag
    const chatHistoryETag = generateETag(allChatHistory);

    // 设置ETag头
    res.set('ETag', chatHistoryETag);

    // 检查客户端是否发送了匹配的ETag
    const clientETag = req.headers['if-none-match'];

    // 如果客户端发送了匹配的ETag，则返回304 Not Modified
    if (clientETag === chatHistoryETag) {
      return res.status(304).end();
    }

    // 返回聊天历史记录
    res.json(allChatHistory);
    console.log('返回历史聊天记录数据成功！');
  } catch (error) {
    console.log('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat History' });
  }
});


module.exports = router