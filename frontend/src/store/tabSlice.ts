import { createSlice } from '@reduxjs/toolkit';

export const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    value: 'search',
  },
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change } = tabSlice.actions;

export default tabSlice.reducer;
