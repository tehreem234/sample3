// models/sortOrderModel.js
const sortOrderOptions = {
    Descending: { id: 0, displayName: "Descending" },
    Ascending: { id: 1, displayName: "Ascending" },
};

const SortOrderModel = {
    // Get all sort order options
    getAllSortOrderOptions: () => {
        return Object.entries(sortOrderOptions).map(([key, value]) => ({
            key,
            ...value,
        }));
    },

    // Get a specific sort order option by ID
    getSortOrderOptionById: (id) => {
        return Object.values(sortOrderOptions).find((option) => option.id === parseInt(id, 10)) || null;
    },
};

module.exports = SortOrderModel;
