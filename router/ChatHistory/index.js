const express = require("express")
const Message = require("../../models/Message/index")

const router = express.Router()

router.get('/chatHistory/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const allChatHistory = await Message.find({
      $or: [
        { sender_username: userId },
        { receiver_username: userId }
      ]
    }).exec()
    res.json(allChatHistory)
    console.log('返回历史聊天记录数据成功！')
  } catch (error) {
    console.log('Error fetching chat history:', error)
    res.status(500).json({ error: 'Failed to fetch chat History' })
  }
})

module.exports = router