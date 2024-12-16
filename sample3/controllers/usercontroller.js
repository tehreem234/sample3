const UserService = require('../services/userService');
const ResponseHandler = require('../utils/ResponseHandler');

class UserController {
    static async updatePassword(req, res) {
        try {
            const { BusinessID, oldPassword, newPassword } = req.body;

            if (!BusinessID || !oldPassword || !newPassword) {
                return ResponseHandler.badRequest(res, 'BusinessID, old password, and new password are required');
            }

            const result = await UserService.updatePassword(BusinessID, oldPassword, newPassword);
            return ResponseHandler.success(res, 'Password updated successfully', result);
        } catch (error) {
            return ResponseHandler.error(res, error.message);
        }
    }
}

module.exports = UserController;