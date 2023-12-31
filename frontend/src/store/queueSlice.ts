import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Song, getQueue } from '../client';

type State = {
	queue: Song[],
};


export const getAndUpdate = createAsyncThunk('queue/getAndUpdate', getQueue);

export const slice = createSlice({
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
    builder.addCase(getAndUpdate.fulfilled, (state: State, action) => {
      state.queue = action.payload.queue;
    });
  },
});


export default slice.reducer;
export const { update } = slice.actions;
