const express = require('express');
const router = express.Router();
const ComplexQueryController = require('../controllers/complexQueryController');
// const { sql, poolPromise } = require('../config/database');

// Existing routes
// Add this route to your existing routes

// Update routes
// ... existing code ...

// Update routes
// http://localhost:3000/api/business/153 get request
router.get('/business/:businessId', ComplexQueryController.getBusinessDetailsById);
// http://localhost:3000/api/business/148 put request
router.put('/business/:businessId', ComplexQueryController.updateBusinessDetails);  // Changed from updateBusinessDetailsById

// ... existing code ...

// New diagnostic route


module.exports = router;