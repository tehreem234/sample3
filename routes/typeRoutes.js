// routes/typeRoutes.js
const express = require('express');
const { getAllTypeOptions, getTypeOptionById } = require('../controllers/typeController');

const router = express.Router();

// Route to get all type options
router.get('/', getAllTypeOptions);

// Route to get a specific type option by ID
router.get('/:id', getTypeOptionById);

module.exports = router;
