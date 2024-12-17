const sql = require('mssql');
require('dotenv').config();

// Define the config object first
const sqlConfig = {
    server: process.env.DB_SERVER || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: {
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

// Global pool variable
let globalPool = null;

const poolPromise = async () => {
    try {
        if (!globalPool) {
            globalPool = await new sql.ConnectionPool(sqlConfig).connect();
            console.log('Connected to database successfully');
        }
        
        // Test the connection
        const testResult = await globalPool.request().query('SELECT 1');
        if (testResult) {
            return globalPool;
        } else {
            throw new Error('Connection test failed');
        }
    } catch (err) {
        console.error('Database Connection Error:', {
            message: err.message,
            config: {
                server: sqlConfig.server,
                user: sqlConfig.user,
                database: sqlConfig.database
            }
        });
        globalPool = null; // Reset the pool on error
        throw new Error('Failed to establish database connection');
    }
};

// Initial connection attempt
poolPromise().catch(err => {
    console.error('Initial connection failed:', err);
});

module.exports = {
    sql,
    poolPromise
};