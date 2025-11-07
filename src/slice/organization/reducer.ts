import { createSlice } from "@reduxjs/toolkit";

interface Organization {
    searchQuery: string;
}
const initialState: Organization = {
    searchQuery: "",
};

const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        }
    },
});

export const { setSearchQuery } = organizationSlice.actions;

export default organizationSlice.reducer;