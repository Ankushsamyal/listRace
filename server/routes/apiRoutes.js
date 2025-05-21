// routes.js
const express = require('express');
const { getDb } = require('../connect.cjs');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ status: 'API is working' });
});

// Get all explore items
router.get('/explore', async (req, res) => {
  try {
    const data = await getDb().collection('explore').find().toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch explore items' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const data = await getDb().collection('categories').find().toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all blog
router.get('/blog', async (req, res) => {
  try {
    const data = await getDb().collection('blog').find().toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blog items' });
  }
});

// Get all login
router.get('/login', async (req, res) => {
  try {
    const data = await getDb().collection('login').find().toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch login items' });
  }
});

router.get('/bookmark', async (req, res) => {
  try {
    const data = await getDb().collection('bookmark').find().toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});




module.exports = router;