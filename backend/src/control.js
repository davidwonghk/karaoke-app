const express = require('express');
const wss = require('./wss.js');

const router = express.Router();

const payload = {
	type: 'control',
	accompaniment: false,
};

router.get('/', (req, res) => {
	res.json(payload);
});

router.post('/accompaniment', (req, res) => {
	payload.accompaniment = !payload.accompaniment;
	wss.remote.broadcast(payload);
	wss.tv.broadcast(payload);
	res.json(payload);
});

router.post('/skip', (req, res) => {
	wss.tv.broadcast({skip: true});
});

module.exports = {router};
