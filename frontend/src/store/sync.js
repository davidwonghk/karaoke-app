import store from './index';
import * as queueSlice from './queueSlice';
import * as playSlice from './playSlice';
import { getWebSocket } from '../client';

export default function syncWithBackend() {
	getWebSocket().onmessage = (event) => {
		const data = JSON.parse(event.data);
		switch (data.type) {
			case 'queue': return store.dispatch(queueSlice.update(data));
			case 'play': return store.dispatch(playSlice.update(data));
			default: break;
		}
	};

	//when the client is first load, 
	// request to get the values of the following,
	// after that we wil reply on websocket to boardcast the update (see socket.onmessage)
	store.dispatch(queueSlice.getAndUpdate());
	store.dispatch(playSlice.getAndUpdate());
}

