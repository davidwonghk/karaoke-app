import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentPlaying } from '../client';

type State = {
	current: string,
};


export const getAndUpdate = createAsyncThunk('play/getAndUpdate', getCurrentPlaying);

export const slice = createSlice({
  name: 'play',
  initialState: {
		current: '',
  },
  reducers: {
		update: (state, action) => {
			state.current = action.payload.current;
		},
  },
  extraReducers(builder) {
    builder.addCase(getAndUpdate.fulfilled, (state: State, action) => {
      state.current = action.payload.current;
    });
  },
});


export default slice.reducer;
export const { update } = slice.actions;
