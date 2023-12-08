const express = require('express');
const router = express.Router();


playback = {
	'next': undefined, //only used for /?next
	'queue': [],
}


router.get('/', (req, res) => {
	const {queue} = playback;
	if (req.params.next) {
		playback.next = next();
	}
	res.json(playback);
});

// insert
router.post('/', (req, res) => {
	const {queue} = playback;
	const {name} = req.body;
	const id = Date.now();
	queue.push({name, id});
	res.json(playback);
});

// shuffle
router.put('/', (req, res) => {
	playback.queue = playback.queue
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
	res.json(playback);
});

// interrupt
router.put('/:id', (req, res) => {
	const {queue}  = playback;
	i = queue.findIndex(s=>s.id===req.params.id);
	if (i > 0) {
		const head = delete queue[i];
		queue.unshift(head);
	}
	res.json(playback);
});

router.delete('/:id', (req, res) => {
	const {queue}  = playback;
	i = queue.findIndex(s=>s.id===req.params.id);
	if (i > 0) {
		delete queue[i];
	}
	res.json(playback);
});

function next() {
	const {queue} = playback;
	return queue.length && queue.shift();
}

module.exports = {router, next};
