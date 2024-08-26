const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Get the MongoDB URI from the environment variable or use localhost for development
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define a schema and model for your data
const rsvpSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  gelaranDikenali: { type: String, required: true },
  bilanganPax: { type: Number, required: true },
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow CORS from any origin, you can restrict it in production

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend! The server is running.');  // Respond with a message at the root URL
});

// Routes
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
