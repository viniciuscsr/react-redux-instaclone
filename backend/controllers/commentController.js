const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');

//@desc create comment
//@route POST /api/posts/:postId/comments
//@access private

const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const newComment = new Comment({
    text,
    user: { id: req.user.id },
    post: req.params.postId,
  });

  const user = await User.findById(req.user._id);
  if (user) {
    user.comments.push(newComment);
    await user.save();
  } else {
    res.status(404);
    throw new Error('User not found');
  }

  const post = await Post.findById(req.params.postId);
  if (post) {
    post.comments.push(newComment);
    await post.save();
  } else {
    res.status(404);
    throw new Error('Post not found');
  }

  const createdComment = await newComment.save();
  res.status(201);
  res.json(createdComment);
});

//@desc get comments by post id
//@route GET /api/posts/:postId/comments/
//@access private

const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate(
    'user',
    'name'
  );

  if (comments) {
    res.json(comments);
  } else {
    res.status(404);
    throw new Error('Comments not found');
  }
});

//@desc delete comment
//@route DELETE /api/posts/:postId/comments/:commentId
//@access private

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (comment) {
    await comment.remove();
    res.json('Comment removed');
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

//@desc update comment
//@route PUT /api/posts/:postId/comments/:commentId
//@access private

const updateComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const comment = await Comment.findById(req.params.commentId);

  if (comment) {
    comment.text = text;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

module.exports = { createComment, getComments, deleteComment, updateComment };
