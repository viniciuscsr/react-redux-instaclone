const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

//@desc Auth user & get token
//@route POST /api/users/login
//@access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

//@desc Register a new user
//@route POST /api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc Get user details by ID
//@route GET /api/users/profile
//@access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).populate('posts');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Update user details
//@route PUT /api/users/profile
//@access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc follow a user
//@route GET /api/users/:userId/follow
//@access private

const followUser = asyncHandler(async (req, res) => {
  const loggedUserId = req.user._id;
  const targetUserId = req.params.userId;

  if (loggedUserId.equals(targetUserId)) {
    res.status(404);
    throw new Error('You cannot follow yourself');
  } else {
    // checking for double entries and adding to the followers array
    let targetUser = await User.findById(targetUserId);
    if (targetUser.followers.includes(loggedUserId)) {
      throw new Error('You already follow this user');
    } else {
      targetUser.followers.push(loggedUserId);
      await targetUser.save();
    }

    //checking for double entries and adding to the following array
    let loggedUser = await User.findById(loggedUserId);
    if (loggedUser.following.includes(targetUser.id)) {
      throw new Error('You already follow this user');
    } else {
      loggedUser.following.push(targetUserId);
      await loggedUser.save();
    }

    res.status(200);
    res.json({ message: 'Success!' });
  }
});

//@desc unfollow a user
//@route GET /api/users/:userId/unfollow
//@access private

const unfollowUser = asyncHandler(async (req, res) => {
  const loggedUserId = req.user._id;
  const targetUserId = req.params.userId;

  if (loggedUserId.equals(targetUserId)) {
    res.status(404);
    throw new Error('You cannot unfollow yourself');
  } else {
    // removing id from the follower field
    let targetUser = await User.findById(targetUserId);
    targetUser.followers.pull(loggedUserId);
    await targetUser.save();

    //removing id from the following field
    let loggedUser = await User.findById(loggedUserId);
    loggedUser.following.pull(targetUserId);
    await loggedUser.save();

    res.status(200);
    res.json({ message: 'Success!' });
  }
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
};
