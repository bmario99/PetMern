const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// POST route to submit contact form
router.post('/submit', contactController.submitContactForm);

module.exports = router;
