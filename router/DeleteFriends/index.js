const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const authenticateJWT = require('../../middlewares/authenticateJWT');

router.post('/delete', authenticateJWT, async (req, res) => {
  try {
    const { userIdToDelete, currentUserId } = req.body;

    console.log(userIdToDelete, currentUserId);

    const currentUser = await User.findOne({ phoneNumber: currentUserId });
    const userDelete = await User.findOne({ phoneNumber: userIdToDelete });
    currentUser.friends = currentUser.friends.filter((user) => {
      return user.phoneNumber !== userIdToDelete;
    });
    userDelete.friends = userDelete.friends.filter((user) => {
      return user.phoneNumber !== Number(currentUserId);
    })
    console.log('currentuser:', currentUser);
    console.log('userDelete:', userDelete);
    await currentUser.save();
    await userDelete.save();
    res.status(200).json({ message: 'Friend deleted successfully' });
    console.log('Friend deleted successfully');
  } catch (error) {
    console.error('Error deleting friend:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
