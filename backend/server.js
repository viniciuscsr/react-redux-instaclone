const express = require('express');
const app = express();

const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 9000;
const dbConnect = require('./config/db');

dotenv.config();

dbConnect();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('backend server is working');
});

app.listen(PORT, console.log('listening on port:' + PORT));
