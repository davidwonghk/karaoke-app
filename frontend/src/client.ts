import axios from 'axios'

const apiUrl = 'http://192.168.8.124:8080';
const wsUrl = 'ws://192.168.8.124:8081';
//const apiUrl = location.origin;
//const wsUrl = apiUrl.replace(/^http/, 'ws');

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
	const res = await axios.get(`${apiUrl}/play/current`);
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

export async function triggerAccompaniment() {
	const res = await axios.post(`${apiUrl}/control/accompaniment`);
	return res.data;
}

export function getWebSocket() {
	return new WebSocket(wsUrl);
}

