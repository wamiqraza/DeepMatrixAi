const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const blogRoutes = require('./routes/blogs');
const app = express();

// Connect MongoDB
mongoose.connect("mongodb+srv://admin:SheikhSaleh56029@mycluster.mkdvp2i.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster");


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);


app.get('/login', (req, res) => {
  res.send("Login endpoint hit");
});

app.listen(5000, () => console.log("Server running on port 5000"));
