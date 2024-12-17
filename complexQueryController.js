const ComplexQueryService = require('../services/complexQueryService');

class ComplexQueryController {
    // Add this method to your existing ComplexQueryController class

    static async getBusinessDetailsById(req, res) {
        try {
            const businessId = parseInt(req.params.businessId);
            if (isNaN(businessId)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Invalid business ID'
                });
            }
    
            const business = await ComplexQueryService.getBusinessDetailsById(businessId);
            res.json(business);
        } catch (error) {
            console.error('Error in getBusinessDetailsById controller:', error);
            res.status(error.message.includes('not found') ? 404 : 500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }


    // Add this method to your existing ComplexQueryController class

    static async updateBusinessDetails(req, res) {
        try {
            const businessId = parseInt(req.params.businessId);
            if (isNaN(businessId)) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Invalid business ID'
                });
            }

            const updateData = req.body;
            const updatedBusiness = await ComplexQueryService.updateBusinessDetails(businessId, updateData);

            res.json({
                message: 'Business details updated successfully',
                data: updatedBusiness
            });

        } catch (error) {
            console.error('Error in updateBusinessDetails controller:', error);
            res.status(
                error.message.includes('not found') ? 404 :
                    error.message.includes('validation') ? 400 : 500
            ).json({
                error: 'Update failed',
                message: error.message
            });
        }
    }
}

module.exports = ComplexQueryController