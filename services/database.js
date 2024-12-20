// services/database.js
const sql = require('mssql');
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME ,
    options: {
        encrypt: true, // Use this if you're connecting to Azure
        trustServerCertificate: true, // For local development
    },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch((err) => {
        console.error('Database Connection Failed!', err);
        throw err;
    });

module.exports = {
    sql,
    poolPromise,
};
