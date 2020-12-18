const Post = require('../models/postModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

//@description fetch all posts
//@route GET /api/posts
//@PUBLIC

const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const posts = await Post.find().limit(pageSize);

  res.json(posts);
});

//@description fetch post by ID
//@route GET /api/posts/:id
//@private

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

//@description create new post
//@route POST /api/posts/
//@Private

const createNewPost = asyncHandler(async (req, res) => {
  const { title, caption } = req.body;

  const newPost = new Post({
    title,
    image: 'uploads/2020-08-22T19:20:53.545Zcape-town-aerial-view.jpg',
    caption,
    user: req.user._id,
  });

  const user = await User.findById(req.user._id);
  if (user) {
    user.posts.push(newPost);
    await user.save();
  } else {
    res.status(404);
    throw new Error('User not found');
  }

  const createdPost = await newPost.save();
  res.status(201);
  res.json(createdPost);
});

module.exports = { getPosts, getPost, createNewPost };
