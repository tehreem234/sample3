// routes/temperatureRoutes.js
const express = require('express');
const { getTemperatures, getTemperatureById } = require('../controllers/temperatureController');

const router = express.Router();

// Route to get all temperatures
router.get('/', getTemperatures);

// Route to get a specific temperature by ID
router.get('/:id', getTemperatureById);

module.exports = router;
