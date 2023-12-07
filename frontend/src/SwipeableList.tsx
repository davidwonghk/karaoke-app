import { Typography, IconButton, Divider } from '@mui/material';
import { ReactElement } from 'react';
import {
} from '@mui/icons-material';

import {
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	LeadingActions,
	TrailingActions,
} from 'react-swipeable-list';

import 'react-swipeable-list/dist/styles.css';


const KLeadingActions = ({...props}) => (
	<LeadingActions>
		<SwipeAction onClick={props.handle}>
			<IconButton size={props.size}>
				{props.icon}
			</IconButton>
		</SwipeAction>
	</LeadingActions>
);

const KTrailingActions = ({...props}) => (
	<TrailingActions>
		<SwipeAction onClick={props.handle}>
			<IconButton size={props.size}>
				{props.icon}
			</IconButton>
		</SwipeAction>
	</TrailingActions>
);

interface SwipeableListProps {
	size: any,
	color: string,
	leadingIcon: ReactElement,
	trailingIcon: ReactElement,
	onClick: any,
	leadingHandle: any,
	trailingHandle: any,
}
interface SwipeableSongProps extends SwipeableListProps {
	children: any,
}
const SwipeableSong = ({size, color, children, leadingIcon, trailingIcon, onClick, leadingHandle, trailingHandle} : SwipeableSongProps) => (
	<SwipeableListItem
		leadingActions={<KLeadingActions size={size} color={color} icon={leadingIcon} handle={leadingHandle} />}
		trailingActions={<KTrailingActions size={size} color={color} icon={trailingIcon} handle={trailingHandle} />}
		onClick={onClick}
		maxSwipe={0.8}
	>
			<Typography noWrap align='justify' color={color}>
				{children}
			</Typography>
	</SwipeableListItem>
);

const KSwipeableList = ({...props}: SwipeableListProps) => (
	<div style={{backgroundColor: 'black'}}>
		<SwipeableList>
				{Array.from({ length: 50 }, (_, i) => i).map((item) => (
					<SwipeableSong {...props}>{item}</SwipeableSong>
				)).reduce((acc, cur, idx) => {
					acc.push(cur);
					acc.push(<Divider sx={{ borderBottomWidth: 3 }}/>);
					return acc;
				}, [] as any[])}
		</SwipeableList>
	</div>
)

export default KSwipeableList;
