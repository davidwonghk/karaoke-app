import { Stack, Typography, IconButton, Box, Divider, TextField } from '@mui/material';
import SwipeableList from './SwipeableList'

import {
	MoveUp as MoveUpIcon,
} from '@mui/icons-material';
import {
	SwipeableListItem,
	SwipeAction,
	LeadingActions,
	TrailingActions,
} from 'react-swipeable-list';

import { useDispatch, useSelector } from 'react-redux'

import store from './store';
import { searchSongs, query } from './store/searchSlice';
import { Song, interruptQueue, appendQueue } from './client';


store.dispatch(searchSongs({
	query: '',
	offset: 0,
	limit: 100,
}));

const SearchTab = () => {

  const dispatch = useDispatch<typeof store.dispatch>();
	const onChange = (e: any) => {
		const {value} = e.target;
		dispatch(query(value));
		dispatch(searchSongs({
			query: value,
			offset: 0,
			limit: 100,
		}));
	};

	const addAndInterrupt = async(name: string) => {
		const {queue} = await appendQueue(name);
		const song = queue.filter((s: Song)=>s.name === name).pop();
		if (song)
			await interruptQueue(song.name);
	};

	const {queryTxt, songs} = useSelector((state: any) => state.search);
	const queue = useSelector((state: any) => state.queue.queue);
	const queued = new Set(queue.map((s:any) => s.name));

	// define the style
	const size = 'small';
	const color = 'white';

	const MyText = ({children, selected}: {children:any, selected?: boolean}) => (
			<Typography noWrap sx={{paddingLeft: 5}} align='justify' variant='h5' color={selected ? 'green' : color}>
				{children}
			</Typography>
	);

	const leadingActions = (name: string) => (
		<LeadingActions>
			<SwipeAction onClick={()=>addAndInterrupt(name)}>
				<Box style={{backgroundColor:'green'}}>
				<IconButton size={size}>
					<MyText>Interrupt</MyText>
					<MoveUpIcon />
				</IconButton>
				</Box>
			</SwipeAction>
		</LeadingActions>
	);

	const SearchListItem = ({children, selected} : {children: any, selected: boolean}) => (
		<SwipeableListItem
			key = {children}
			leadingActions={leadingActions(children)}
			onClick={() => selected ? undefined : appendQueue(children)}
			maxSwipe={0.5}
		>
			<MyText selected={selected}>{children}</MyText>
		</SwipeableListItem>
	);

	const SongList = () => (
		<SwipeableList>
			{songs.map((song: Song) => (
				<SearchListItem selected={queued.has(song.name)}>{song.name}</SearchListItem>
			))}
		</SwipeableList>
	);

	return (
	<Stack direction='column'>
		<TextField id="outlined-search" label="Search song" type="search" onChange={onChange} defaultValue={queryTxt}>
		</TextField>
		<Divider />
		<SongList />
	</Stack>
	);
}

export default SearchTab;
