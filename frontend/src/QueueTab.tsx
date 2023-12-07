import { Typography, IconButton } from '@mui/material';
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

const onClick = console.log.bind(this);

const KLeadingActions = ({...props}) => (
	<LeadingActions>
		<SwipeAction onClick={onClick}>
			<IconButton size={props.size} color={props.color}>
				<Typography color={props.color}>Play Next</Typography>
				<MoveUpIcon />
			</IconButton>
		</SwipeAction>
	</LeadingActions>
);

const KTrailingActions = ({...props}) => (
	<TrailingActions>
		<SwipeAction onClick={onClick}>
			<IconButton size={props.size} color={props.color}>	
				<DeleteIcon />
				<Typography color={props.color}>Delete</Typography>
			</IconButton>
		</SwipeAction>
	</TrailingActions>
);

interface QueueListItemProps {
	size: any,
	color: string,
	children: any,
}
const QueueListItem = ({size, color, children} : QueueListItemProps) => (
	<SwipeableListItem
		leadingActions={<KLeadingActions size={size} color={color} />}
		trailingActions={<KTrailingActions size={size} color={color} />}
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
			<QueueListItem size='small' color='primary'>{item}</QueueListItem>
		))}
	</SwipeableList>
);
export default QueueList;
