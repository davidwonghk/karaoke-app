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

import { useDispatch, useSelector } from 'react-redux'

import store from './store';
import { updateQueue, updateCurrent, update } from './store/queueSlice';
import { Song, deleteFromQueue, interruptQueue, getWebSocket, getCurrentPlaying} from './client';


const socket = getWebSocket();
socket.onmessage = (event) => {
	const data = JSON.parse(event.data);
	if (data.queue) {
		store.dispatch(update(data));
		store.dispatch(updateCurrent());
	}
};

store.dispatch(updateQueue());
store.dispatch(updateCurrent());

const QueueTab = () => {
  //const dispatch = useDispatch<typeof store.dispatch>();
	const queue = useSelector((state: any) => state.queue.queue);
	const playing = useSelector((state: any) => state.queue.current);

	// define the style
	const size = 'small';

	const MyText = ({children, color='white', variant='h5'}: {children:any, color?:string, variant?:any}) => (
			<Typography noWrap sx={{paddingLeft: 5}} align='justify' variant={variant} color={color}>
				{children}
			</Typography>
	);

	const leadingActions = (key: string) => (
		<LeadingActions>
			<SwipeAction onClick={()=>interruptQueue(key)}>
				<Box style={{backgroundColor:'green'}}>
				<IconButton size={size}>
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
				<IconButton size={size}>	
					<MyText>Delete</MyText>
					<DeleteIcon />
				</IconButton>
				</Box>
			</SwipeAction>
		</TrailingActions>
	);

	const QueueListItem = ({sid, key, children} : {sid: string, key: string, children: any}) => (
		<SwipeableListItem
			leadingActions={leadingActions(sid)}
			trailingActions={trailingActions(sid)}
			onClick={()=>console.log(sid)}
			maxSwipe={0.5}
		>
			<MyText>{children}</MyText>
		</SwipeableListItem>
	);

	const QueueList = () => (
		<SwipeableList>
			{queue.map((song: Song, idx: number) => (
				<QueueListItem sid={song.id} key={song.id}>{idx+1}. {song.name}</QueueListItem>
			))}
		</SwipeableList>
	);

	return (
	<Stack direction='column'>
		<MyText color='green' variant='h4'>Playing: {playing}</MyText>
		<Divider />
		<QueueList />
	</Stack>
	);
}

export default QueueTab;
