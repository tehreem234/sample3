const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');
const validateRequest = require('../middleware/validateRequest');

router.post('/updatePassword', 
    validateRequest.validatePasswordUpdate,
    UserController.updatePassword
);

module.exports = router;