import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Song, searchSongs as clientSearchSongs } from '../client';


type State = {
	queryTxt: string,
	page: number,
	limit: number,
	songs: Song[],
	isLoading: boolean,
};

export const searchSongs = createAsyncThunk(
	'search/searchSongs', 
	async({query, offset, limit}: {query:string, offset:number, limit: number}) => clientSearchSongs(query, offset, limit)
);

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
		queryTxt: '',
		page: 0,
		limit: 10,
		songs: [],
		isLoading: false,
  } as State,
  reducers: {
		query: (state, action) => {
			const {payload} = action;
			state.queryTxt = payload;
		},
  },
  extraReducers(builder) {
    builder.addCase(searchSongs.fulfilled, (state: State, action) => {
			state.isLoading = false;
      state.songs = action.payload.songs;
    });
		builder.addCase(searchSongs.pending, (state: State, action) => {
			state.isLoading = true;
		});
	},
});

// Action creators are generated for each case reducer function
//export const { search } = searchSlice.actions;

export default searchSlice.reducer;
export const { query } = searchSlice.actions;
