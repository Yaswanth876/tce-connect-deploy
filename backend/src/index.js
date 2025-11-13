require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// CORS configuration to allow frontend requests
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:8081'],
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('TCE Connect Backend API is running');
});

// User routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Event routes
const eventRoutes = require('./routes/event');
app.use('/api/events', eventRoutes);

// Club routes
const clubRoutes = require('./routes/club');
app.use('/api/clubs', clubRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
