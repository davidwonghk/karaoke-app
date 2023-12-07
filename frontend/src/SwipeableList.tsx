import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
//import './SwipeableList.css';

const leadingActions = () => (
<LeadingActions>
	<SwipeAction onClick={() => console.info('swipe action triggered')}>
		Action name
	</SwipeAction>
</LeadingActions>
);

const trailingActions = () => (
<TrailingActions>
	<SwipeAction
		destructive={true}
		onClick={() => console.info('swipe action triggered')}
	>
		Delete
	</SwipeAction>
</TrailingActions>
);

const SwipeableSong = ({...props}) => (
	<SwipeableListItem
		leadingActions={leadingActions()}
		trailingActions={trailingActions()}
	>
		{props.children}
	</SwipeableListItem>

)

export default () => (
	<SwipeableList>
      {Array.from({ length: 50 }, (_, i) => i).map((item) => (
				<SwipeableSong>{item}</SwipeableSong>
      ))}
	</SwipeableList>
)
