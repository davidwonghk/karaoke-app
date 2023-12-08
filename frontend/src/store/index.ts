import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";
import queueReducer from "./queueSlice";


const store = configureStore({
	reducer: {
		tab: tabReducer,
		queue: queueReducer,
	},
})

export default store;

