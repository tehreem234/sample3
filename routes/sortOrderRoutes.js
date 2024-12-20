// routes/sortOrderRoutes.js
const express = require('express');
const { getAllSortOrderOptions, getSortOrderOptionById } = require('../controllers/sortOrderController');

const router = express.Router();

// Route to get all sort order options
router.get('/', getAllSortOrderOptions);

// Route to get a specific sort order option by ID
router.get('/:id', getSortOrderOptionById);

module.exports = router;
