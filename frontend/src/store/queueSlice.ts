import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Song, getQueue } from '../client';

type State = {
	queue: Song[],
};


export const updateQueue = createAsyncThunk('queue/updateQueue', getQueue);

export const queueSlice = createSlice({
  name: 'queue',
  initialState: {
		queue: [],
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
  },
});


// Action creators are generated for each case reducer function
//export const { suffle } = queueSlice.actions;

export default queueSlice.reducer;
export const { update } = queueSlice.actions;
