import * as rm from 'typed-rest-client/RestClient';

const API_URL = 'http://localhost:8080'

interface SongQueue {
	current: string?,
	next: string?,
	queue: string[],
}
async function get_queue() : SongQueue {
	const rest = new rm.RestClient('queue', API_URL + '/queue');
	const res = await rest.get<SongQueue>('/queue');
	return res;
}
