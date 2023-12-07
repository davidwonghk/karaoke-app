import React from 'react';
import { Stack, AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import { Button } from './Buttons';
import SwipeableList from './SwipeableList';

import {
	QueueMusic as QueueMusicIcon, 
	ManageSearch as ManageSearchIcon,
	SkipNext as SkipNextIcon,
	Shuffle as ShuffleIcon,
	InterpreterMode as InterpreterModeIcon,
	Delete as DeleteIcon,
	MoveUp as MoveUpIcon,
} from '@mui/icons-material';

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

			<SwipeableList
				size='small'
				color='primary'
				onClick={(e:any)=>console.log(e)}
				leadingIcon={<DeleteIcon color='primary'/>}
				leadingHandle={(e:any)=>console.log(e)}
				trailingIcon={<MoveUpIcon color='primary'/>}
				trailingHandle={(e: any)=>console.log(e)}
			/>

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
