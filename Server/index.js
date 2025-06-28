require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const blogRoutes = require('./routes/blogs');
const contactRoutes = require('./routes/contact');
const app = express();

const mongoDB = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);


app.get('/login', (req, res) => {
  res.send("Login endpoint hit");
});

app.get('/', (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log("Server running on port 5000"));
module.exports = app;
