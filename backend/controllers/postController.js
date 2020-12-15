const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');

//@description fetch all posts
//@route GET /api/posts
//@PUBLIC

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.json(posts);
});

//@description fetch post by ID
//@route GET /api/posts/:id
//@PUBLIC

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

module.exports = { getPosts, getPost };
