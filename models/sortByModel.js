// models/sortByModel.js
const sortByOptions = {
    LastUpdatedDate: { id: 0, displayName: "Last Updated Date" },
    CustomerName: { id: 1, displayName: "Customer Name" },
    LeadType: { id: 2, displayName: "Lead Type" },
    OpenandHotStatus: { id: 3, displayName: "Open and Hot Status" },
    Assigned_To: { id: 4, displayName: "Assigned To" },
    Lead_Date: { id: 5, displayName: "Lead Date" },
};

const SortByModel = {
    // Get all sort-by options
    getAllSortByOptions: () => {
        return Object.entries(sortByOptions).map(([key, value]) => ({
            key,
            ...value,
        }));
    },

    // Get a single sort-by option by ID
    getSortByOptionById: (id) => {
        return Object.values(sortByOptions).find((option) => option.id === parseInt(id, 10)) || null;
    },
};

module.exports = SortByModel;
