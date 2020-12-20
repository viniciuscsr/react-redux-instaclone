const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

const commentOwnership = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  } else if (comment.user.id.equals(req.user._id)) {
    next();
  } else {
    res.status(403);
    throw new Error(
      'Not authorized, user does not have edit/delete permission'
    );
  }
});

const postOwnership = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  } else if (post.user.equals(req.user._id)) {
    next();
  } else {
    res.status(403);
    throw new Error(
      'Not authorized, user does not have edit/delete permission'
    );
  }
});

module.exports = { commentOwnership, postOwnership };
