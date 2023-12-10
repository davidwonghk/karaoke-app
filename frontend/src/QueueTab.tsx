import { Stack, Typography, IconButton, Box, Divider } from '@mui/material';
import SwipeableList from './SwipeableList'
import {
	Delete as DeleteIcon,
	MoveUp as MoveUpIcon,
} from '@mui/icons-material';
import {
	SwipeableListItem,
	SwipeAction,
	LeadingActions,
	TrailingActions,
} from 'react-swipeable-list';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import store from './store';
import { updateQueue, update } from './store/queueSlice';
import { Song, deleteFromQueue, interruptQueue, getWebSocket } from './client';


const socket = getWebSocket();
socket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	if (data.queue) {
		console.log('got signal to update queue');
		store.dispatch(update(data));
	}
};

const QueueTab = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
	useEffect(() => {
		dispatch(updateQueue());
	});
	
	const queue = useSelector((state: any) => state.queue.queue);

//  const moveToTop = (event: React.SyntheticEvent, val: string) => dispatch(change(val));

	// define the style
	const size = 'small';
	const color = 'primary';

	const MyText = ({children}: {children:any}) => (
			<Typography noWrap sx={{paddingLeft: 5}} align='justify' variant='h5' color={color}>
				{children}
			</Typography>
	);

	const leadingActions = (key: string) => (
		<LeadingActions>
			<SwipeAction onClick={()=>interruptQueue(key)}>
				<Box style={{backgroundColor:'green'}}>
				<IconButton size={size} color={color}>
					<MyText>Interrupt</MyText>
					<MoveUpIcon />
				</IconButton>
				</Box>
			</SwipeAction>
		</LeadingActions>
	);

	const trailingActions = (key: string) => (
		<TrailingActions >
			<SwipeAction onClick={()=>deleteFromQueue(key)}>
				<Box style={{backgroundColor:'red'}}>
				<IconButton size={size} color={color}>	
					<MyText>Delete</MyText>
					<DeleteIcon />
				</IconButton>
				</Box>
			</SwipeAction>
		</TrailingActions>
	);

	const QueueListItem = ({key, children} : {key: string, children: any}) => (
		<SwipeableListItem
			leadingActions={leadingActions(key)}
			trailingActions={trailingActions(key)}
			onClick={console.log.bind(this)}
			maxSwipe={0.5}
		>
			<MyText>{children}</MyText>
		</SwipeableListItem>
	);

	const QueueList = () => (
		<SwipeableList>
			{queue.map((song: Song) => (
				<QueueListItem key={song.id}>{song.name}</QueueListItem>
			))}
		</SwipeableList>
	);

	return (
	<Stack direction='column'>
		<MyText>Playing: </MyText>
		<Divider />
		<MyText>Next: </MyText>
		<Divider />
		<QueueList />
	</Stack>
	);
}

export default QueueTab;
