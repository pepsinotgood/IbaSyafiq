const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Get the MongoDB URI from the environment variable or use localhost for development
const MONGODB_URI = process.env.MONGODB_URI;
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
  date: { type: String }, // Store the date of the RSVP
  timestamp: { type: Date, default: Date.now }, 
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

// Define a schema and model for comments
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

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
    const { nama, gelaranDikenali, bilanganPax } = req.body;

    // Automatically include the current date and timestamp
    const rsvp = new Rsvp({
      nama,
      gelaranDikenali,
      bilanganPax,
      date: new Date().toLocaleDateString(),
      timestamp: new Date(),
    });

    await rsvp.save();
    res.status(201).json({ message: 'RSVP submitted successfully!', rsvp });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    res.status(500).json({ message: 'Failed to submit RSVP', error });
  }
});

// Route to handle comment submissions
app.post('/api/comment', async (req, res) => {
  try {
    const { name, comment } = req.body;

    const newComment = new Comment({
      name,
      comment,
      timestamp: new Date(),
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment submitted successfully!', comment: newComment });
  } catch (error) {
    console.error('Error submitting comment:', error);
    res.status(500).json({ message: 'Failed to submit comment', error });
  }
});

app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ timestamp: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
