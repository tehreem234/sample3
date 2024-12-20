// controllers/sortByController.js
const SortByModel = require('../models/sortByModel');

// Get all sort-by options
const getAllSortByOptions = (req, res) => {
    try {
        const options = SortByModel.getAllSortByOptions();
        res.status(200).json({ success: true, data: options });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single sort-by option by ID
const getSortByOptionById = (req, res) => {
    try {
        const { id } = req.params;
        const option = SortByModel.getSortByOptionById(id);

        if (!option) {
            return res.status(404).json({ success: false, message: 'Sort-by option not found' });
        }

        res.status(200).json({ success: true, data: option });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllSortByOptions, getSortByOptionById };
