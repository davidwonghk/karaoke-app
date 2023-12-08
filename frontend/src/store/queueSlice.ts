import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
	Song,
	getQueue as cGetQueue,
	shuffleQueue as cShuffleQueue,
} from '../client';

type State = {
	queue: Song[],
};

export const getQueue = createAsyncThunk('queue/getQueue', cGetQueue);

export const shuffleQueue = createAsyncThunk('queue/shuffleQueue', cShuffleQueue);

export const queueSlice = createSlice({
  name: 'queue',
  initialState: {
		queue: []
  },
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(getQueue.fulfilled, (state: State, action) => {
      state.queue = action.payload.queue;
    });
		builder.addCase(shuffleQueue.fulfilled, (state: State, action) => {
			state.queue = action.payload.queue;
		});
  },
});

// Action creators are generated for each case reducer function
//export const { suffle } = queueSlice.actions;

export default queueSlice.reducer;

