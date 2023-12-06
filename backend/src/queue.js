const express = require('express');
const router = express.Router();

ds = {
	'next': undefined, //only used for /?next
	'queue': [],
}

router.get('/', (req, res) => {
	if (req.params.next && ds.queue.length) {
		ds.next = ds.queue.shift();
	}
	res.json(ds);
});

// insert
router.post('/', (req, res) => {
	ds.queue.push(req.body.song);
	res.json(ds);
});

// shuffle
router.put('/', (req, res) => {
	ds.queue = ds.queue
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
	res.json(ds);
});

// interrupt
router.put('/:id', (req, res) => {
	const { queue }  = ds;
	i = queue.findIndex(s=>s.id===req.params.id)
	if (i > 0) {
		const head = delete queue[i];
		queue.unshift(head);
	}
	res.json(ds);
});

module.exports = router;
