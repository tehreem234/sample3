const sql = require('mssql');
const dbConfig = require('../config/dbconfig');

class UserService {
    static async updatePassword(BusinessID, oldPassword, newPassword) {
        let pool;
        try {
            pool = await sql.connect(dbConfig);

            // Simple query without database prefix
            const verifyResult = await pool.request()
                .input('BusinessID', sql.Int, BusinessID)
                .query(`
                    SELECT UserPassword 
                    FROM DCUser
                    WHERE BusinessID = @BusinessID
                `);

            if (verifyResult.recordset.length === 0) {
                throw new Error('User not found');
            }

            if (verifyResult.recordset[0].UserPassword !== oldPassword) {
                throw new Error('Incorrect old password');
            }

            const updateResult = await pool.request()
                .input('BusinessID', sql.Int, BusinessID)
                .input('newPassword', sql.NVarChar(50), newPassword)
                .query(`
                    UPDATE DCUser
                    SET UserPassword = @newPassword
                    WHERE BusinessID = @BusinessID
                `);

            if (updateResult.rowsAffected[0] === 0) {
                throw new Error('Failed to update password');
            }

            return { success: true };

        } catch (error) {
            console.error('Database Error:', error);
            throw error;
        } finally {
            if (pool) {
                await pool.close();
            }
        }
    }
}

module.exports = UserService;