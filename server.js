const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from your local frontend
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204  // Ensure preflight requests respond with a successful status
}));

// Middleware
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend! The server is running.');
});

// RSVP Route
const rsvpSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  gelaranDikenali: { type: String, required: true },
  bilanganPax: { type: Number, required: true },
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

app.post('/api/rsvp', async (req, res) => {
  try {
    const rsvp = new Rsvp(req.body);
    await rsvp.save();
    res.status(201).json({ message: 'RSVP submitted successfully!', rsvp });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    res.status(500).json({ message: 'Failed to submit RSVP', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
