const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Both routes use the 'login' collection
router.post('/signup', authController.signup); // Stores data in 'login'
router.post('/login', authController.login);   // Reads from 'login'

module.exports = router;