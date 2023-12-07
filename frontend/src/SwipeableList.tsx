import { Divider } from '@mui/material';
import { ReactElement } from 'react';
import {
} from '@mui/icons-material';

import { SwipeableList } from 'react-swipeable-list';

import 'react-swipeable-list/dist/styles.css';

const KSwipeableList = ({children} : {children: any[]}) => (
	<div>
		<SwipeableList>
				{(children || []).reduce((acc, cur, idx) => {
					acc.push(cur);
					acc.push(<Divider />);
					return acc;
				}, [] as any[])}
		</SwipeableList>
	</div>
);
export default KSwipeableList;
