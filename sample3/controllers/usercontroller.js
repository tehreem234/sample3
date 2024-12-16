const UserService = require('../services/userservice');

class UserController {
    static async updatePassword(req, res) {
        try {
            const { BusinessID, oldPassword, newPassword } = req.body;

            if (!BusinessID || !oldPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'BusinessID, old password, and new password are required'
                });
            }

            const result = await UserService.updatePassword(BusinessID, oldPassword, newPassword);
            
            return res.status(200).json({
                success: true,
                message: 'Password updated successfully',
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updatePasswordDirect(req, res) {
        try {
            const { BusinessID, newPassword } = req.body;

            if (!BusinessID || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'BusinessID and new password are required'
                });
            }

            const result = await UserService.updatePasswordDirect(BusinessID, newPassword);
            
            return res.status(200).json({
                success: true,
                message: 'Password updated successfully',
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = UserController;