const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');
const { storage } = require('../utils/cloudinary'); // Import the same storage config

const upload = multer({ storage }); // Use the same Cloudinary storage

// CREATE new blog
router.post('/', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    // Cloudinary will automatically use the 'uploads' folder
    const coverImage = req.file ? req.file.path : '';

    const blog = new Blog({
      title,
      content,
      coverImage,
      slug,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// UPDATE blog by ID
router.put('/:id', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, content } = req.body;

    const updateData = {
      title,
      content,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
    };

    if (req.file) {
      updateData.coverImage = req.file.path;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid blog ID' });
    }
    res.status(400).json({ error: err.message });
  }
});

// GET all blogs (sorted by creation date)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET blog by ID (for editing)
router.get('/by-id/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Blog ID' });
    }
    res.status(500).json({ error: err.message });
  }
});

// GET blog by slug (for public viewing)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid blog ID' });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;