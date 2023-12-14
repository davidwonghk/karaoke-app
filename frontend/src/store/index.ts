import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";
import queueReducer from "./queueSlice";
import searchReducer from "./searchSlice";
import playReducer from "./playSlice";
import controlReducer from "./controlSlice";


const store = configureStore({
	reducer: {
		tab: tabReducer,
		queue: queueReducer,
		search: searchReducer,
		play: playReducer,
		control: controlReducer,
	},
})

export default store;

