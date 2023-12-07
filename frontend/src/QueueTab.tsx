import { Typography, IconButton, Box, Divider } from '@mui/material';
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

import { useSelector, useDispatch } from 'react-redux'

const QueueTab = () => {
  const dispatch = useDispatch();

  const handleNext = (event: React.SyntheticEvent, val: string) => dispatch(change(val));
  const handleDelete = (event: React.SyntheticEvent, val: string) => dispatch(change(val));

	// define the style
	const size = 'small';
	const color = 'primary';

	const KLeadingActions = () => (
		<LeadingActions>
			<SwipeAction onClick={handleNext}>
				<IconButton size={size} color={color}>
					<Typography color={color}>Play Next</Typography>
					<MoveUpIcon />
				</IconButton>
			</SwipeAction>
		</LeadingActions>
	);

	const KTrailingActions = () => (
		<TrailingActions>
			<SwipeAction onClick={handleDelete}>
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
			{Array.from({ length: 7 }, (_, i) => i).map((item) => (
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
