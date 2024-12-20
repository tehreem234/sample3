// routes/sortByRoutes.js
const express = require('express');
const { getAllSortByOptions, getSortByOptionById } = require('../controllers/sortByController');

const router = express.Router();

// Route to get all sort-by options
router.get('/', getAllSortByOptions);

// Route to get a specific sort-by option by ID
router.get('/:id', getSortByOptionById);

module.exports = router;
