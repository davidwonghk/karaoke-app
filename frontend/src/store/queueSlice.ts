import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Song, getQueue, getCurrentPlaying } from '../client';

type State = {
	queue: Song[],
	current: string,
};


export const updateQueue = createAsyncThunk('queue/updateQueue', getQueue);
export const updateCurrent = createAsyncThunk('queue/updateCurrent', getCurrentPlaying);

export const queueSlice = createSlice({
  name: 'queue',
  initialState: {
		queue: [],
		current: "",
  },
  reducers: {
		update: (state, action) => {
			state.queue = action.payload.queue;
		},
  },
  extraReducers(builder) {
    builder.addCase(updateQueue.fulfilled, (state: State, action) => {
      state.queue = action.payload.queue;
    });
    builder.addCase(updateCurrent.fulfilled, (state: State, action) => {
      state.current = action.payload.playing;
    });
  },
});


// Action creators are generated for each case reducer function
//export const { suffle } = queueSlice.actions;

export default queueSlice.reducer;
export const { update } = queueSlice.actions;
