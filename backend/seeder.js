const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const posts = require('./data/posts').default;
const users = require('./data/users');
const Post = require('./models/postModel');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    console.log('start');
    // await Post.deleteMany();
    await User.deleteMany();
    console.log('data deleted');
    await User.insertMany(users);
    // await Post.insertMany(posts);

    console.log('data imported'.green.inverse);
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
};

importData();
