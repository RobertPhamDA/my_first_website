const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Multer config để upload ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Import routes
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const categoryRoutes = require('./routes/category.routes');
const commentRoutes = require('./routes/comment.routes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes(upload));
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('API running');
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
