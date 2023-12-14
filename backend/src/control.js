const express = require('express');
const wss = require('./wss.js');

const router = express.Router();

const payload = {
	'accompaniment': false,
};

router.get('/', (req, res) => {
	res.json(payload);
});

router.post('/accompaniment', (req, res) => {
	payload.accompaniment = !payload.accompaniment;
	wss.remote.boardcast(payload);
	wss.tv.boardcast(payload);
	res.json(payload);
});

router.post('/skip', (req, res) => {
	wss.tv.boardcast(payload);
});

module.exports = {router};
