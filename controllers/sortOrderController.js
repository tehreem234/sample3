const sortOrderModel = require('../models/sortOrderModel');

// Get all sort order options
const getAllSortOrderOptions = (req, res) => {
    try {
        const options = sortOrderModel.getAllSortOrderOptions();
        res.status(200).json({ success: true, data: options });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific sort order option by ID
const getSortOrderOptionById = (req, res) => {
    try {
        const { id } = req.params;
        const option = sortOrderModel.getSortOrderOptionById(id);

        if (!option) {
            return res.status(404).json({ success: false, message: 'Sort order option not found' });
        }

        res.status(200).json({ success: true, data: option });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllSortOrderOptions, getSortOrderOptionById };
