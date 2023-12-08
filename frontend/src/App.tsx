import React from 'react';
import { Stack, AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import {
	QueueMusic as QueueMusicIcon, 
	ManageSearch as ManageSearchIcon,
	SkipNext as SkipNextIcon,
	Shuffle as ShuffleIcon,
	InterpreterMode as InterpreterModeIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'

import { Button } from './Buttons';
import SwipeableList from './SwipeableList';
import QueueTab from './QueueTab';
import SearchTab from './SearchTab';

import store from './store';
import { change } from './store/tabSlice';
import { shuffleQueue } from './store/queueSlice';

function App() {
	const activeTab = useSelector((state: any) => state.tab.value);
  const dispatch = useDispatch<typeof store.dispatch>();
	const onChangeTab = (_: any, val: string) => {dispatch(change(val))};
	const onClickShuffle = () => {dispatch(shuffleQueue())};
  return (
		<Stack direction='column' sx={{backgroundColor: 'black'}}>
			<AppBar position="sticky">
				<Tabs value={activeTab} 
					onChange={onChangeTab} 
					variant="fullWidth"
				> 
					<Tab icon={<QueueMusicIcon />} value="queue" label="Queue"/>
					<Tab icon={<ManageSearchIcon />} value="search" label="Search" />
				</Tabs>
			</AppBar>

			{activeTab === 'queue' ? <QueueTab /> : <SearchTab /> }

			<AppBar position="sticky" sx={{ top: 'auto', bottom: 0}}>
				<Toolbar disableGutters>
					<Button aria-label='accompaniment' icon={<InterpreterModeIcon />}>
						Accompaniment
					</Button>
					<Button aria-label='shuffle' icon={<ShuffleIcon />} onClick={onClickShuffle}>
						Shuffle
					</Button>
					<Button aria-label='skip' icon={<SkipNextIcon />}>Skip</Button>
				</Toolbar>
			</AppBar>

		</Stack>
  );
}

export default App;
