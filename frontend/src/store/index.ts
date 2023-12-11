import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";
import queueReducer from "./queueSlice";
import searchReducer from "./searchSlice";


const store = configureStore({
	reducer: {
		tab: tabReducer,
		queue: queueReducer,
		search: searchReducer,
	},
})

export default store;

