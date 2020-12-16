const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  getPosts,
  getPost,
  createNewPost,
} = require('../controllers/postController');

router.route('/').get(getPosts).post(protect, createNewPost);
router.route('/:id').get(getPost);

module.exports = router;
