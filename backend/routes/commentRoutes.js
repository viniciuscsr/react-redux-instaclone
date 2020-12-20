const express = require('express');
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/authMiddleware');
const { commentOwnership } = require('../middleware/authorizationMiddleware');
const {
  createComment,
  getComments,
  deleteComment,
} = require('../controllers/commentController');

router.route('/').post(protect, createComment).get(protect, getComments);
router.route('/:commentId').delete(protect, commentOwnership, deleteComment);

module.exports = router;
