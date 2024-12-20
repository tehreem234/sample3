// routes/leadTypeRoutes.js
const express = require('express');
const { getLeadTypes, getLeadTypeById } = require('../controllers/leadTypeController');

const router = express.Router();

// Route to get all lead types
router.get('/', getLeadTypes);

// Route to get a specific lead type by ID
router.get('/:id', getLeadTypeById);

module.exports = router;
