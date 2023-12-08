import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as rUseDispatch } from 'react-redux'
import tabReducer from "./tabSlice";
import queueReducer from "./queueSlice";


const store = configureStore({
	reducer: {
		tab: tabReducer,
		queue: queueReducer,
	},
})

export const useDispatch = () => rUseDispatch<typeof store.dispatch>()
export default store;

