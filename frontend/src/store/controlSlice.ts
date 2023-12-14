import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getControlFlags } from '../client';

type State = {
	accompaniment: boolean,
};


export const getAndUpdate = createAsyncThunk('control/getAndUpdate', getControlFlags);

export const slice = createSlice({
  name: 'control',
  initialState: {
		accompaniment: false,
  } as State,
  reducers: {
		update: (state, action) => {
			state.accompaniment = action.payload.accompaniment;
		},
  },
  extraReducers(builder) {
    builder.addCase(getAndUpdate.fulfilled, (state: State, action) => {
			state.accompaniment = action.payload.accompaniment;
    });
  },
});


export default slice.reducer;
export const { update } = slice.actions;
