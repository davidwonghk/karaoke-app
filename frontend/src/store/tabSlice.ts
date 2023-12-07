import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'tab',
  initialState: {
    value: 'queue',
  },
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { change } = slice.actions

export default slice.reducer
