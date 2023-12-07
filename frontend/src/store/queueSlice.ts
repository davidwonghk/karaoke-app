import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

export const slice = createSlice({
  name: 'queue',
  initialState: {
		current: undefined,
		next: undefined,
		queue: [],
  },
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change } = slice.actions;

export default slice.reducer;
