const express = require('express');
const app = express();

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

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);
app.use('/api/upload', uploadRoutes);

const folder = path.resolve();
app.use('/uploads', express.static(path.join(folder, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(folder, '/frontend/build/')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(folder, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('backend server is working');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log('listening on port:' + PORT));
