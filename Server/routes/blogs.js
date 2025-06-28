const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');
const path = require('path');

// allocating storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// CREATE new blog
router.post('/', upload.single('imageFile'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    // Fixed: Use req.file instead of req.files, and consistent field name
    const coverImage = req.file ? `uploads/${req.file.filename}` : '';

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

// UPDATE blog by ID
router.put('/:id', upload.single('imageFile'), async (req, res) => {
  try {
    const { title, content } = req.body;

    const updateData = {
      title,
      content,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
    };

    // Fixed: Use coverImage instead of imageFile
    if (req.file) {
      updateData.coverImage = `uploads/${req.file.filename}`;
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