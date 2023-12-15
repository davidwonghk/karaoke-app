const express = require('express');
const { tv: wss } = require('./wss.js');

const router = express.Router();

router.post('/switchAudio', (req, res) => {
	wss.broadcast({switchAudio: true});
});

router.post('/skip', (req, res) => {
	wss.broadcast({skip: true});
});

module.exports = {router};
