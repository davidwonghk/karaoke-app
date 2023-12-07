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

interface SearchListItemProps {
	size: any,
	color: string,
	children: any,
}
const SearchListItem = ({size, color, children} : SearchListItemProps) => (
	<SwipeableListItem
		leadingActions={<KLeadingActions size={size} color={color} />}
		onClick={onClick}
		maxSwipe={0.8}
	>
			<Typography noWrap align='justify' color={color} variant='h4'>
				{children}
			</Typography>
	</SwipeableListItem>
);

const SearchList = () => (
	<SwipeableList>
		{Array.from({ length: 50 }, (_, i) => i).map((item) => (
			<SearchListItem size='small' color='secondary'>{item}</SearchListItem>
		))}
	</SwipeableList>
);
export default SearchList;
