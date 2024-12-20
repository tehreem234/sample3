// controllers/typeController.js
const TypeModel = require('../models/typeModel');

// Get all type options
const getAllTypeOptions = (req, res) => {
    try {
        const options = TypeModel.getAllTypeOptions();
        res.status(200).json({ success: true, data: options });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific type option by ID
const getTypeOptionById = (req, res) => {
    try {
        const { id } = req.params;
        const option = TypeModel.getTypeOptionById(id);

        if (!option) {
            return res.status(404).json({ success: false, message: 'Type option not found' });
        }

        res.status(200).json({ success: true, data: option });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllTypeOptions, getTypeOptionById };
