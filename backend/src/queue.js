const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

const payload = {
	'next': undefined, //only used for /?next
	'queue': [],
}

router.get('/', (req, res) => {
	const {queue} = payload;
	if (req.query.next) {
		payload.next = next();
	}
	return res.json(payload);
});

// insert
router.post('/', (req, res) => {
	const {queue} = payload;
	const {name} = req.body;
	const id = Date.now().toString();
	queue.push({name, id});
	boardcastUpdate(res);
});

// shuffle
router.put('/', (req, res) => {
	payload.queue = payload.queue
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
	boardcastUpdate(res);
});

// interrupt
router.put('/:id', (req, res) => {
	const {queue}  = payload;
	i = queue.findIndex(s=>s.id===req.params.id);
	if (i > 0) { //no need to interrupt if i == 0
		const head = queue[i];
		queue.splice(i, 1);
		queue.unshift(head);
	}
	boardcastUpdate(res);
});

router.delete('/:id', (req, res) => {
	const {queue}  = payload;
	i = queue.findIndex(s=>s.id===req.params.id);
	if (i >= 0) {
		queue.splice(i, 1);
	}
	boardcastUpdate(res);
});

function next() {
	const {queue} = payload;
	const res = queue.length && queue.shift();
	boardcast();
	return res;
}

const wss = new WebSocket.WebSocketServer({port: process.env.WEBSOCKET_PORT});
function boardcast() {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(payload));
		}
	});
}
function boardcastUpdate(res) {
	boardcast();
	return res.json(payload);
}

module.exports = {router, next};
