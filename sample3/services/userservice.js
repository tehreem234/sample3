const sql = require('mssql');
const dbConfig = require('../config/dbconfig');

class UserService {
    static async updatePassword(BusinessID, oldPassword, newPassword) {
        try {
       
            await sql.connect(dbConfig);
            console.log('Successfully connected to database');
            // Verify old password
            const verifyResult = await sql.query`
                SELECT UserPassword 
                FROM dbo.DCUser
                WHERE BusinessID = ${BusinessID}
            `;
            console.log('Available tables:', tables.recordset);

            if (verifyResult.recordset.length === 0) {
                throw new Error('User not found');
            }

            if (verifyResult.recordset[0].UserPassword !== oldPassword) {
                throw new Error('Incorrect old password');
            }

            // Update password
            const result = await sql.query`
                UPDATE dbo.DCUser 
                SET UserPassword = ${newPassword}
                WHERE BusinessID = ${BusinessID}
            `;

            if (result.rowsAffected[0] === 0) {
                throw new Error('Failed to update password');
            }

            return { success: true };

        } catch (error) {
            throw error;
        } finally {
            await sql.close();
        }
    }

    static async updatePasswordDirect(BusinessID, newPassword) {
        try {
            await sql.connect(dbConfig);

            const result = await sql.query`
                UPDATE dbo.DCUser 
                SET UserPassword = ${newPassword}
                WHERE BusinessID = ${BusinessID}
            `;

            if (result.rowsAffected[0] === 0) {
                throw new Error('User not found');
            }

            return { success: true };

        } catch (error) {
            throw error;
        } finally {
            await sql.close();
        }
    }
}

module.exports = UserService;