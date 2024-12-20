// models/leadStatusModel.js
const { poolPromise, sql } = require('../services/database');

const LeadStatus = {
    // Get all lead statuses
    getAllLeadStatuses: async () => {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM LeadStatus');
        return result.recordset;
    },

    // Get a single lead status by ID
    getLeadStatusById: async (id) => {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('LeadStatusID', sql.TINYINT, id)
            .query('SELECT * FROM LeadStatus WHERE LeadStatusID = @LeadStatusID');
        return result.recordset[0];
    },
};

module.exports = LeadStatus;
