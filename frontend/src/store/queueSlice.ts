import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
	Song,
	getQueue as cGetQueue,
	shuffleQueue as cShuffleQueue,
} from '../client';

export const getQueue = createAsyncThunk('queue/getQueue', cGetQueue);

export const shuffleQueue = createAsyncThunk('queue/shuffleQueue', cShuffleQueue);

export const queueSlice = createSlice({
  name: 'queue',
  initialState: {
		queue: [] as Song[],
  },
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(getQueue.fulfilled, (state: {queue: string[]}, action) => {
      state.queue = action.payload.queue;
    });
		builder.addCase(shuffleQueue.fulfilled, (state: {queue: string[]}, action) => {
			state.queue = action.payload.queue;
		});
  },
});

// Action creators are generated for each case reducer function
//export const { suffle } = queueSlice.actions;

export default queueSlice.reducer;

