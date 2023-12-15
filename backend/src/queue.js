const express = require('express');
const { remote: wss } = require('./wss.js');
const router = express.Router();

const payload = {
	type: 'queue',
	next: undefined, //only used for /?next
	queue: [],
};

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
	broadcast();
	res.json(payload);
});

// shuffle
router.put('/', (req, res) => {
	payload.queue = payload.queue
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
	broadcast();
	res.json(payload);
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
	broadcast();
	res.json(payload);
});

router.delete('/:id', (req, res) => {
	const {queue}  = payload;
	i = queue.findIndex(s=>s.id===req.params.id);
	if (i >= 0) {
		queue.splice(i, 1);
	}
	broadcast();
	res.json(payload);
});

function next() {
	const {queue} = payload;
	const res = queue.length && queue.shift();
	wss.broadcast(payload);
	return res;
}

function broadcast() {
	wss.broadcast(payload);
}

module.exports = {router, next, broadcast};
