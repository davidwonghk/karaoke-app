import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentPlaying } from '../client';

type State = {
	play: string,
};


export const getAndUpdate = createAsyncThunk('play/getAndUpdate', getCurrentPlaying);

export const slice = createSlice({
  name: 'play',
  initialState: {
		play: '',
  },
  reducers: {
		update: (state, action) => {
			state.play = action.payload;
		},
  },
  extraReducers(builder) {
    builder.addCase(getAndUpdate.fulfilled, (state: State, action) => {
      state.play = action.payload;
    });
  },
});


export default slice.reducer;
export const { update } = slice.actions;
