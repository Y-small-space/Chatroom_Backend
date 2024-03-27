const express = require('express');
const router = express.Router();
const User = require('../../models/User/index');
const authenticateJWT = require('../../middlewares/authenticateJWT');

router.post('/setprofile', authenticateJWT, async (req, res) => {
  const profileData = req.body;
  const { phoneNumber } = profileData;

  try {
    const existingUser = await User.findOne({ phoneNumber });

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
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;