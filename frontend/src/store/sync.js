import store from './index';
import * as queueSlice from './queueSlice';
import * as playSlice from './playSlice';
import * as controlSlice from './controlSlice';
import { getWebSocket } from '../client';

export default function syncWithBackend() {
	getWebSocket().onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.queue) {
			store.dispatch(queueSlice.update(data));
		}
		if (data.play) {
			store.dispatch(playSlice.update(data));
		}
		if (data.accompaniment !== undefined) {
			store.dispatch(controlSlice.update(data));
		}
	};

	//when the client is first load, 
	// request to get the values of the following,
	// after that we wil reply on websocket to boardcast the update (see socket.onmessage)
	store.dispatch(queueSlice.getAndUpdate());
	store.dispatch(playSlice.getAndUpdate());
	store.dispatch(controlSlice.getAndUpdate());
}

