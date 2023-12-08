import React from 'react';
import { Stack, AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import {
	QueueMusic as QueueMusicIcon, 
	ManageSearch as ManageSearchIcon,
	SkipNext as SkipNextIcon,
	Shuffle as ShuffleIcon,
	InterpreterMode as InterpreterModeIcon,
} from '@mui/icons-material';

import { Button } from './Buttons';
import SwipeableList from './SwipeableList';
import QueueTab from './QueueTab';
import SearchTab from './SearchTab';


import { useSelector, useDispatch } from 'react-redux'
import store from './store';
import { change } from './store/tabSlice';
import { shuffleQueue } from './store/queueSlice';

function App() {
	const activeTab = useSelector((state: any) => state.tab.value);
  const dispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, val: string) => dispatch(change(val));
  return (
		<Stack direction='column' sx={{backgroundColor: 'black'}}>
			<AppBar position="sticky">
				<Tabs value={activeTab} onChange={handleChange} variant="fullWidth"> <Tab icon={<QueueMusicIcon />} value="queue" label="Queue" />
					<Tab icon={<ManageSearchIcon />} value="search" label="Search" />
				</Tabs>
			</AppBar>

			{activeTab == 'queue'
				? <QueueTab />
				: <SearchTab />
			}

			<AppBar position="sticky" sx={{ top: 'auto', bottom: 0}}>
				<Toolbar disableGutters>
					<Button aria-label='accompaniment' icon={<InterpreterModeIcon />}>Accompaniment</Button>
					<Button aria-label='shuffle' icon={<ShuffleIcon />}>Shuffle</Button>
					<Button aria-label='skip' icon={<SkipNextIcon />}>Skip</Button>
				</Toolbar>
			</AppBar>

		</Stack>
  );
}

export default App;
