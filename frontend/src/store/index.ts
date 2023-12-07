import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";


const store = configureStore({
	reducer: {
		tab: tabReducer,
	},
})

export default store;

