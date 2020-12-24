const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const asyncHandler = require('express-async-handler');

//@description fetch all posts
//@route GET /api/posts
//@PUBLIC

const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const posts = await Post.find().limit(pageSize).populate('user');

  res.json(posts);
});

//@description fetch newsfeed posts
//@route GET /api/posts/newsfeed
//@PUBLIC private

const getNewsfeedPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  let posts = [];

  for (let i = 0; i < user.following.length; i++) {
    let postsFromFollowing = await Post.find({
      user: user.following[i],
    }).populate('user');
    for (let i = 0; i < postsFromFollowing.length; i++) {
      posts.push(postsFromFollowing[i]);
    }
  }

  const sortedPosts = posts.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });

  res.json(sortedPosts);
});

//@description fetch post by ID
//@route GET /api/posts/:postId
//@private

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId).populate('user');

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
  const { title, caption, image } = req.body;

  const newPost = new Post({
    title,
    image,
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

//@desc delete post
//@route DELETE /api/posts/:postId
//@access private/owner

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  const user = await User.findById(req.user._id);

  // Deleting the comments of the post
  for (let i = 0; i < post.comments.length; i++) {
    await Comment.findByIdAndDelete(post.comments[i]._id);
  }

  //Deleting post from user.posts
  if (user) {
    user.posts.pull(postId);
    user.save();
  } else {
    res.status(404);
    throw new Error('User not found');
  }

  if (post) {
    await post.remove();
    res.json('Post removed');
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

//@desc update comment
//@route PUT /api/posts/:postId/
//@access private/owner

const updatePost = asyncHandler(async (req, res) => {
  const { title, caption } = req.body;

  const post = await Post.findById(req.params.postId);

  if (post) {
    post.title = title;
    post.caption = caption;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

//@desc like post
//@route GET /api/posts/:postId/like
//@access private

const likePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  //check if user already liked the post
  const userLiked = post.likes.includes(userId);
  if (userLiked === true) {
    res.status(406);
    throw new Error('User already liked the post');
  } else {
    post.likes.push(userId);
    await post.save();
    res.json({ success: true });
  }
});

//@desc unlike post
//@route GET /api/posts/:postId/unlike
//@access private

const unlikePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  const userLiked = post.likes.includes(userId);
  if (userLiked === true) {
    post.likes.pull(userId);
    await post.save();
    res.json({ success: true });
  } else {
    res.status(406);
    throw new Error('User never liked this post');
  }
});

module.exports = {
  getPosts,
  getNewsfeedPosts,
  getPost,
  createNewPost,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
};
