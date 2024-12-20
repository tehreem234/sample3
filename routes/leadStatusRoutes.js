// routes/leadStatusRoutes.js
const express = require('express');
const { getAllLeadStatuses, getLeadStatusById } = require('../controllers/leadStatusController');

const router = express.Router();

router.get('/', getAllLeadStatuses); // Get all lead statuses
router.get('/:id', getLeadStatusById); // Get a single lead status by ID

module.exports = router;
