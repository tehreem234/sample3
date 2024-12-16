const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');

// Route to update password with old password verification
router.put('/updatePassword', UserController.updatePassword);

// Route to update password directly
router.put('/updatePasswordDirect', UserController.updatePasswordDirect);

module.exports = router;