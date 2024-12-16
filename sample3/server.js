

const express = require('express');
const userRoutes = require('./routes/userroutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});