require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true,
        encrypt: false,
        enableArithAbort: true
    }
};

// Debug logging
console.log('Environment variables loaded:', {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER
});

console.log('Database configuration:', {
    server: config.server,
    database: config.database
});

if (!config.database) {
    throw new Error('Database name is not defined in environment variables. Check your .env file.');
}

module.exports = config;