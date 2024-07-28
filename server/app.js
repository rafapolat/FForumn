const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum'); 
const playerEvaluationRoutes = require('./routes/playerEvaluation');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/FFORUM', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Bağlantı durumu kontrolü
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/playerEvaluation', playerEvaluationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/users', userRoutes); // Correct path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// React uygulamasının build dosyalarını serve etme
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
