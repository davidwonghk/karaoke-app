import axios from 'axios'

const url = 'http://localhost:8080';

export type Song = {
	name: string,
	id: number,
}

export type QueueResponse = {
	next: string | undefined,
	queue: Song[],
}

export async function getQueue() : Promise<QueueResponse> {
	const res = await axios.get(url+'/queue');
	return res.data;
}

export async function appendQueue(name: string): Promise<QueueResponse> {
	const res = await axios.post(url+'/queue', {name});
	return res.data;
}

//cut song
export async function shiftQueue(): Promise<QueueResponse> {
	const params = { next: "true" };
	const res = await axios.get(url+'/queue', {params});
	return res.data;
}

export async function interruptQueue(id: string): Promise<QueueResponse> {
	const res = await axios.put(url+'/queue/' + id);
	return res.data;
}

export async function shuffleQueue(): Promise<QueueResponse> {
	const res = await axios.put(url+'/queue', null);
	return res.data;
}

