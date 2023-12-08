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
import { updateQueue } from './store/queueSlice';
import { Song } from './client';


const QueueTab = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
	useEffect(() => {
		dispatch(updateQueue());
	}, []);
	
	const queue = useSelector((state: any) => state.queue.queue);

//  const moveToTop = (event: React.SyntheticEvent, val: string) => dispatch(change(val));
	const onClick = console.log.bind(this);

	// define the style
	const size = 'small';
	const color = 'primary';

	const MyText = ({children}: {children:any}) => (
			<Typography noWrap sx={{paddingLeft: 5}} align='justify' variant='h5' color={color}>
				{children}
			</Typography>
	);

	const KLeadingActions = () => (
		<LeadingActions>
			<SwipeAction onClick={onClick}>
				<Box style={{backgroundColor:'green'}}>
				<IconButton size={size} color={color}>
					<MyText>Interrupt</MyText>
					<MoveUpIcon />
				</IconButton>
				</Box>
			</SwipeAction>
		</LeadingActions>
	);

	const KTrailingActions = () => (
		<TrailingActions >
			<SwipeAction onClick={onClick} destructive={true}>
				<Box style={{backgroundColor:'red'}}>
				<IconButton size={size} color={color}>	
					<MyText>Delete</MyText>
					<DeleteIcon />
				</IconButton>
				</Box>
			</SwipeAction>
		</TrailingActions>
	);

	const QueueListItem = ({children} : {children: any}) => (
		<SwipeableListItem
			leadingActions={<KLeadingActions />}
			trailingActions={<KTrailingActions />}
			onClick={onClick}
			maxSwipe={0.8}
		>
			<MyText>{children}</MyText>
		</SwipeableListItem>
	);

	const QueueList = () => (
		<SwipeableList>
			{queue.map((song: Song) => (
				<QueueListItem>{song.name}</QueueListItem>
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
