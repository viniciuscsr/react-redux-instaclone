const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { postOwnership } = require('../middleware/authorizationMiddleware');
const {
  getPosts,
  getNewsfeedPosts,
  getPost,
  createNewPost,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
} = require('../controllers/postController');

router.route('/').get(getPosts).post(protect, createNewPost);
router.route('/newsfeed').get(protect, getNewsfeedPosts);
router
  .route('/:postId')
  .get(protect, getPost)
  .delete(protect, postOwnership, deletePost)
  .put(protect, postOwnership, updatePost);

router.get('/:postId/like', protect, likePost);
router.get('/:postId/unlike', protect, unlikePost);

module.exports = router;
