import axios from 'axios'

const SERVER_PORT = process.env.KARAOKE_SERVER_PORT || '8080';
const WEBSOCKET_PORT = process.env.KARAOKE_WEBSOCKET_PORT || '8081';

const apiUrl = `http://${window.location.hostname}:${SERVER_PORT}`;
const wsUrl = `ws://${window.location.hostname}:${WEBSOCKET_PORT}`;

export type Song = {
	name: string,
	id: string,
}

export type QueueResponse = {
	next: string | undefined,
	queue: Song[],
}

export async function getQueue() : Promise<QueueResponse> {
	const res = await axios.get(apiUrl+'/queue');
	return res.data;
}

export async function appendQueue(name: string): Promise<QueueResponse> {
	const res = await axios.post(apiUrl+'/queue', {name});
	return res.data;
}

//cut song
export async function shiftQueue(): Promise<QueueResponse> {
	const params = { next: "true" };
	const res = await axios.get(apiUrl+'/queue', {params});
	return res.data;
}

export async function interruptQueue(id: string): Promise<QueueResponse> {
	const url = apiUrl+'/queue/' + id;
	console.log('interrupt', url);
	const res = await axios.put(url);
	return res.data;
}

export async function shuffleQueue(): Promise<QueueResponse> {
	const res = await axios.put(apiUrl+'/queue', null);
	return res.data;
}

export async function deleteFromQueue(id: string): Promise<QueueResponse> {
	const res = await axios.delete(apiUrl+'/queue/' + id);
	return res.data;
}

export async function searchSongs(
	query: string='',
	offset: number=0,
	limit: number|undefined=undefined
) {
	const res = await axios.get(`${apiUrl}/songs?query=${query}&offset=${offset}&limit=${limit}`);
	return res.data;
}

export async function getCurrentPlaying() {
	const res = await axios.get(`${apiUrl}/current`);
	return res.data;
}

export async function getControlFlags() {
	const res = await axios.get(`${apiUrl}/control`);
	return res.data;
}

export async function skipSong() {
	const res = await axios.post(`${apiUrl}/control/skip`);
	return res.data;
}

export async function switchAudio() {
	const res = await axios.post(`${apiUrl}/control/switchAudio`);
	return res.data;
}

export function getWebSocket() {
	return new WebSocket(wsUrl);
}

