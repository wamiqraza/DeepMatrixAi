const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
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

// CREATE new service
router.post('/', upload.fields([{ name: 'iconFile' }, { name: 'imageFile' }]), async (req, res) => {
  try {
    const { title, description, detailDescription } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-');

    const iconUrl = req.files.iconFile ? `/uploads/${req.files.iconFile[0].filename}` : '';
    const imageUrl = req.files.imageFile ? `/uploads/${req.files.imageFile[0].filename}` : '';

    const service = new Service({
      title,
      description,
      detailDescription,
      iconFile: iconUrl,
      imageFile: imageUrl,
      slug,
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all services (sorted by creation date)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET service by ID (for editing)
router.get('/by-id/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid service ID' });
    }
    res.status(500).json({ error: err.message });
  }
});

// GET service by slug (for public viewing)
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE service by ID
router.put('/:id', upload.fields([{ name: 'iconFile' }, { name: 'imageFile' }]), async (req, res) => {
  try {
    const { title, description, detailDescription } = req.body;
    
    // Build update data object
    const updateData = {
      title,
      description,
      detailDescription
    };

    // Update slug if title is provided
    if (title) {
      updateData.slug = title.toLowerCase().replace(/\s+/g, '-');
    }

    // Only update files if new ones are uploaded
    if (req.files && req.files.iconFile) {
      updateData.iconFile = `/uploads/${req.files.iconFile[0].filename}`;
    }
    if (req.files && req.files.imageFile) {
      updateData.imageFile = `/uploads/${req.files.imageFile[0].filename}`;
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(updatedService);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid service ID' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
});

// DELETE service by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid service ID' });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;