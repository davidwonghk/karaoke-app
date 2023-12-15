import { Stack, Typography, IconButton, Box, Divider, TextField, Badge } from '@mui/material';
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
			await interruptQueue(song.id);
	};

	const {queryTxt, songs} = useSelector((state: any) => state.search);
	const counter = useSelector((state: any) => state.queue.queue)
	                .map((s:Song) => s.name)
									.reduce((d:any,i:string) => {
										d[i] = (d[i]||0) + 1;
										return d;
									}, {});

	// define the style
	const size = 'small';
	const color = 'white';

	const MyText = ({children}: {children:any}) => (
			<Typography noWrap sx={{paddingLeft: 5}} align='justify' variant='h5' color={color}>
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

	const SearchListItem = ({children, count} : {children: any, count: number}) => (
		<SwipeableListItem
			key = {children}
			leadingActions={leadingActions(children)}
			onClick={() => appendQueue(children)}
			maxSwipe={0.4}
			onSwipeProgress={(progress, dir) => (dir==='right' && progress>=30) && addAndInterrupt(children)}
		>
			<MyText>{children}</MyText>
			{count && <Badge badgeContent={count} color="success" sx={{paddingLeft: 2}}/> }
		</SwipeableListItem>
	);

	const SongList = () => (
		<SwipeableList>
			{songs.map((song: Song) => (
				<SearchListItem count={counter[song.name]}>{song.name}</SearchListItem>
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
