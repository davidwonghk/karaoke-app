import React from 'react';
import { Stack, AppBar, Box, Toolbar, Tabs, Tab } from '@mui/material';
import { Button } from './Buttons';
import SwipeableList from './SwipeableList';

import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

import { useSelector, useDispatch } from 'react-redux'
import { change } from './store/tabSlice';

function App() {
	const activeTab = useSelector((state: any) => state.tab.value);
  const dispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, val: string) => dispatch(change(val));
  return (
		<Stack direction='column'>
			<AppBar position="sticky">
				<Tabs value={activeTab} onChange={handleChange} variant="fullWidth"> <Tab icon={<QueueMusicIcon />} value="queue" label="Queue" />
					<Tab icon={<ManageSearchIcon />} value="search" label="Search" />
				</Tabs>
			</AppBar>

			<SwipeableList/>

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
