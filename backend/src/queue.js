const express = require('express');
const router = express.Router();

ds = {
	'next': undefined,
	'queue': [],
}

router.get('/', (req, res) => {
	res.json(ds);
});

router.post('/', (req, res) => {
	ds.queue.push(req.body);
	res.json(ds);
});

router.put('/shuffle', (req, res) => {
	ds.queue = ds.queue
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
	res.json(ds);
});

router.put('/interrupt/:id', (req, res) => {
	const { queue, next } = ds;
	i = queue.findIndex(s=>s.id===req.params.id)
	if (i !== -1) {
		ds.next = queue[i];
		queue.remove(i);
		queue.unshift(next);
	}
	res.json(ds);
});

module.exports = router;
