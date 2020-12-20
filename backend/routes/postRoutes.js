const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { postOwnership } = require('../middleware/authorizationMiddleware');
const {
  getPosts,
  getPost,
  createNewPost,
  deletePost,
  updatePost,
} = require('../controllers/postController');

router.route('/').get(getPosts).post(protect, createNewPost);
router
  .route('/:postId')
  .get(protect, getPost)
  .delete(protect, postOwnership, deletePost)
  .put(protect, postOwnership, updatePost);

module.exports = router;
