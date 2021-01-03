const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const posts = require('./data/posts');
const users = require('./data/users');
const Post = require('./models/postModel');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    console.log('start');
    await Post.deleteMany();
    await User.deleteMany();
    console.log('data deleted');

    const createdUsers = await User.insertMany(users);
    const user1 = createdUsers[0]._id;

    const samplePosts = posts.map((post) => {
      return { ...post, user: user1 };
      user1.posts.push(post);
    });

    await Post.insertMany(samplePosts);

    console.log('data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
};

importData();
