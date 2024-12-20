// controllers/temperatureController.js
const temperatures = require('../models/temperatureModel');

// Fetch all temperatures
const getTemperatures = (req, res) => {
    const temperatureArray = Object.entries(temperatures).map(([key, value]) => ({
        key,
        ...value,
    }));
    res.status(200).json({ success: true, data: temperatureArray });
};

// Fetch temperature by ID
const getTemperatureById = (req, res) => {
    const { id } = req.params;
    const temperature = Object.values(temperatures).find((temp) => temp.id === parseInt(id, 10));

    if (!temperature) {
        return res.status(404).json({ success: false, message: "Temperature not found" });
    }

    res.status(200).json({ success: true, data: temperature });
};

module.exports = { getTemperatures, getTemperatureById };
