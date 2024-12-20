// controllers/leadTypeController.js
const leadTypes = require('../models/leadTypeModel');

// Fetch all lead types
const getLeadTypes = (req, res) => {
    const leadTypeArray = Object.entries(leadTypes).map(([key, value]) => ({
        key,
        ...value,
    }));
    res.status(200).json({ success: true, data: leadTypeArray });
};

// Fetch lead type by ID
const getLeadTypeById = (req, res) => {
    const { id } = req.params;
    const leadType = Object.values(leadTypes).find((type) => type.id === parseInt(id, 10));

    if (!leadType) {
        return res.status(404).json({ success: false, message: "Lead type not found" });
    }

    res.status(200).json({ success: true, data: leadType });
};

module.exports = { getLeadTypes, getLeadTypeById };
