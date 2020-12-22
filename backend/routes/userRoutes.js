const express = require('express');
const router = express.Router();

const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.route('/').post(registerUser);
router
  .route('/:userId')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
