// models/typeModel.js
const typeOptions = {
    Credit: { id: 0, displayName: "Credit Application" },
    Appraisal: { id: 1, displayName: "Appraisal Request" },
    VehicleLead: { id: 2, displayName: "Vehicle Lead" },
    WalkIn: { id: 3, displayName: "Walk-In" },
    Phone: { id: 4, displayName: "Phone" },
    Email: { id: 5, displayName: "Email" },
    Other: { id: 6, displayName: "Other" },
    ContactForm: { id: 7, displayName: "SMS" },
};

const TypeModel = {
    // Get all type options
    getAllTypeOptions: () => {
        return Object.entries(typeOptions).map(([key, value]) => ({
            key,
            ...value,
        }));
    },

    // Get a specific type option by ID
    getTypeOptionById: (id) => {
        return Object.values(typeOptions).find((option) => option.id === parseInt(id, 10)) || null;
    },
};

module.exports = TypeModel;
