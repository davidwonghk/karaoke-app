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
import { useSelector } from 'react-redux'

import { useDispatch } from './store';
import { getQueue } from './store/queueSlice';


const QueueTab = () => {
	const dispatch = useDispatch()
	useEffect(() => dispatch(()=>{
		getQueue();
		return () => {};
	}), []);
	const queue = useSelector((state: any) => state.queue.queue);

//  const moveToTop = (event: React.SyntheticEvent, val: string) => dispatch(change(val));
	const onClick = console.log.bind(this);

	// define the style
	const size = 'small';
	const color = 'primary';

	const KLeadingActions = () => (
		<LeadingActions>
			<SwipeAction onClick={onClick}>
				<IconButton size={size} color={color}>
					<Typography color={color}>Interrupt</Typography>
					<MoveUpIcon />
				</IconButton>
			</SwipeAction>
		</LeadingActions>
	);

	const KTrailingActions = () => (
		<TrailingActions>
			<SwipeAction onClick={onClick}>
				<IconButton size={size} color={color}>	
					<DeleteIcon />
					<Typography color={color}>Delete</Typography>
				</IconButton>
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
				<Typography noWrap align='justify' color={color} variant='h4'>
					{children}
				</Typography>
		</SwipeableListItem>
	);

	const QueueList = () => (
		<SwipeableList>
			{queue.map((item: string) => (
				<QueueListItem>{item}</QueueListItem>
			))}
		</SwipeableList>
	);

	return (
	<Stack direction='column'>
		<Box>Playing: </Box>
		<Divider />
		<Box>Next: </Box>
		<Divider />
		<QueueList />
	</Stack>
	);
}

export default QueueTab;