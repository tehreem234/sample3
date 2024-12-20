// controllers/leadStatusController.js
const LeadStatus = require('../models/leadStatusModel');

// Get all lead statuses
const getAllLeadStatuses = async (req, res) => {
    try {
        const leadStatuses = await LeadStatus.getAllLeadStatuses();
        res.status(200).json({ success: true, data: leadStatuses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single lead status by ID
const getLeadStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const leadStatus = await LeadStatus.getLeadStatusById(id);
        if (!leadStatus) {
            return res.status(404).json({ success: false, message: 'Lead status not found' });
        }
        res.status(200).json({ success: true, data: leadStatus });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllLeadStatuses,
    getLeadStatusById,
};
