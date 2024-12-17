const express = require('express');
const emailRoutes = require('./routes/emailroutes');
const emailTypeRoutes = require('./routes/emailtyperoutes');
const businessPartyRoutes = require('./routes/businessPartyRoutes');
const addressRoutes = require('./routes/addressRoutes');
const businessEmailRoutes = require('./routes/businessEmailRoutes');
const businessPhoneRoutes = require('./routes/businessPhoneRoutes');
const phoneTypeRoutes = require('./routes/phoneTypeRoutes');
const phoneRoutes = require('./routes/phoneRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const complexQueryRoutes = require('./routes/complexQueryRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// // Routes
// app.use('/api', emailRoutes);
// app.use('/api', emailTypeRoutes);

// // http://localhost:3000/api/business-parties/8
// app.use('/api', businessPartyRoutes);
// // http://localhost:3000/api/addresses/7
// app.use('/api', addressRoutes);
// // http://localhost:3000/api/business-emails/business/153
// app.use('/api', businessEmailRoutes);
// // http://localhost:3000/api/business-phones/business/153
// app.use('/api', businessPhoneRoutes);
// // http://localhost:3000/api/phone-types/2
// app.use('/api', phoneTypeRoutes);
// // http://localhost:3000/api/phones/127
// app.use('/api', phoneRoutes);
// // http://localhost:3000/api/employees/1
// app.use('/api', employeeRoutes);
// http://localhost:3000/api/business-complete/153
app.use('/api', complexQueryRoutes);


// Add this near the top of your app.js, after require('dotenv').config()
console.log('Database Configuration:', {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
