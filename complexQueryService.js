const ComplexQueryModel = require('../models/complexQueryModel');

class ComplexQueryService {
    // Add this method to your existing ComplexQueryService class

    static async getBusinessDetailsById(businessId) {
        try {
            const business = await ComplexQueryModel.getBusinessDetailsById(businessId);
            if (!business) {
                throw new Error(`Business with ID ${businessId} not found`);
            }
            return business;
        } catch (error) {
            console.error('Error in getBusinessDetailsById service:', error);
            throw error;
        }
    }
    static async updateBusinessDetails(businessId, updateData) {
        try {
            // Check if business exists
            const exists = await ComplexQueryModel.checkBusinessExists(businessId);
            if (!exists) {
                throw new Error('Business not found');
            }

            // Call the model method with the correct name
            const result = await ComplexQueryModel.updateBusinessDetailsById(businessId, updateData);
            return result;
        } catch (error) {
            console.error('Error in updateBusinessDetails service:', error);
            throw error;
        }
    }

    static async updateBusinessDetailsById(businessId, updateData) {
        try {
            // Check if business exists
            const exists = await this.getBusinessDetailsById(businessId);
            if (!exists) {
                throw new Error(`Business with ID ${businessId} not found`);
            }
    
            // Validate update data
            this.validateUpdateData(updateData);
    
            // Perform update
            await ComplexQueryModel.updateBusinessDetailsById(businessId, updateData);
    
            // Return updated data
            return await this.getBusinessDetailsById(businessId);
        } catch (error) {
            console.error('Error in updateBusinessDetailsById service:', error);
            throw error;
        }
    }
    
    static validateUpdateData(data) {
        if (!data) throw new Error('Update data is required');
    
        if (data.businessInfo) {
            if (!data.businessInfo.businessName) {
                throw new Error('Business name is required');
            }
            if (typeof data.businessInfo.isActive !== 'boolean') {
                throw new Error('isActive must be a boolean');
            }
        }
    
        if (data.address) {
            if (!data.address.street || !data.address.city || !data.address.state) {
                throw new Error('Address must include street, city, and state');
            }
        }
    }
}

module.exports = ComplexQueryService;