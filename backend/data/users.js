const bcrypt = require('bcrypt');

const users = [
  {
    posts: [],
    comments: [],
    followers: [],
    following: [],
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    posts: [],
    comments: [],
    followers: [],
    following: [],
    name: 'Peter Doe',
    email: 'peter@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    posts: [],
    comments: [],
    followers: [],
    following: [],
    name: 'Alex Doe',
    email: 'alex@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users;
