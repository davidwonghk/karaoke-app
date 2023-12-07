import {
LeadingActions,
SwipeableList,
SwipeableListItem,
SwipeAction,
TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

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

const SwipeableSong = () => (
	<SwipeableListItem
		leadingActions={leadingActions()}
		trailingActions={trailingActions()}
	>
		Item content
	</SwipeableListItem>
)

export default () => (
	<SwipeableList>
		<SwipeableSong/>
		<SwipeableSong/>
		<SwipeableSong/>
		<SwipeableSong/>
		<SwipeableSong/>
	</SwipeableList>
)
