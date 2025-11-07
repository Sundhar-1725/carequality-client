import { configureStore } from "@reduxjs/toolkit";
import organizationSlice from "../slice/organization/reducer";

const store = configureStore({
    reducer: {
        organization: organizationSlice,
    },
});

export default store;