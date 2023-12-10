const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

const playload = {
	'next': undefined, //only used for /?next
	'queue': [],
}

router.get('/', (req, res) => {
	const {queue} = playload;
	if (req.params.next) {
		playload.next = next();
	}
	return res.json(playload);
});

// insert
router.post('/', (req, res) => {
	const {queue} = playload;
	const {name} = req.body;
	const id = Date.now().toString();
	queue.push({name, id});
	boardcastUpdate(res);
});

// shuffle
router.put('/', (req, res) => {
	playload.queue = playload.queue
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
	boardcastUpdate(res);
});

// interrupt
router.put('/:id', (req, res) => {
	const {queue}  = playload;
	i = queue.findIndex(s=>s.id===req.params.id);
	if (i > 0) {
		const head = queue[i];
		queue.splice(i, 1);
		queue.unshift(head);
	}
	boardcastUpdate(res);
});

router.delete('/:id', (req, res) => {
	const {queue}  = playload;
	i = queue.findIndex(s=>s.id===req.params.id);
	if (i > 0) {
		queue.splice(i, 1);
	}
	boardcastUpdate(res);
});

function next() {
	const {queue} = playload;
	return queue.length && queue.shift();
}

const wss = new WebSocket.WebSocketServer({port: process.env.WEBSOCKET_WEB_PORT || 8081});
function boardcastUpdate(res) {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(playload));
		}
	});
	return res.json(playload);
}

module.exports = {router, next};
