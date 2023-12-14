const express = require('express');
const wss = require('./wss.js');

const router = express.Router();

const payload = {
	'accompaniment': false,
};


router.put('/accompaniment', (req, res) => {
	payload.accompaniment = !payload.accompaniment;
	wss.remote.boardcast(payload);
	wss.tv.boardcast(payload);
	res.json(payload);
});

router.put('skip', (req, res) => {
	wss.tv.boardcast(payload);
});

module.exports = {router};
