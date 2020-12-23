const express = require('express');
const app = express();

const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const PORT = process.env.PORT || 4000;
const dbConnect = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
dbConnect();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('backend server is working');
});

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);
app.use('/api/upload', uploadRoutes);

const folder = path.resolve();
app.use('/uploads', express.static(path.join(folder, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log('listening on port:' + PORT));
