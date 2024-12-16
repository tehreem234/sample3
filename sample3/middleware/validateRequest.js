const validateRequest = {
    validatePasswordUpdate: (req, res, next) => {
        const { BusinessID, oldPassword, newPassword } = req.body;

        if (!BusinessID || typeof BusinessID !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'Valid BusinessID is required'
            });
        }

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Both old and new passwords are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters long'
            });
        }

        next();
    }
};

module.exports = validateRequest;