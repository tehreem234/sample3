require('dotenv').config();
const express = require('express');
const leadTypeRoutes = require('./routes/leadTypeRoutes');
const temperatureRoutes = require('./routes/temperatureRoutes');
const leadStatusRoutes = require('./routes/leadStatusRoutes');
const sortByRoutes = require('./routes/sortByRoutes');
const sortOrderRoutes = require('./routes/sortOrderRoutes');
const typeRoutes = require('./routes/typeRoutes');
const app = express();

// Middleware
app.use(express.json());

// API Routes

// http://localhost:3000/api/lead-types
app.use('/api/lead-types', leadTypeRoutes);

// http://localhost:3000/api/temperatures
app.use('/api/temperatures', temperatureRoutes);
app.use('/api/lead-statuses', leadStatusRoutes);
app.use('/api/sort-by', sortByRoutes);

app.use('/api/sort-order', sortOrderRoutes);

// http://localhost:3000/api/types
app.use('/api/types', typeRoutes);


// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
