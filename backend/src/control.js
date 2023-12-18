const express = require('express');
const { tv: wss } = require('./wss.js');
const logger = require('./logger.js');

const router = express.Router();

router.post('/switchAudio', (req, res) => {
	logger.debug(`received swithAudio: ${req.socket.remoteAddress}`)
	wss.broadcast({switchAudio: true});
});

router.post('/skip', (req, res) => {
	logger.debug(`received skip: ${req.socket.remoteAddress}`)
	wss.broadcast({skip: true});
});

module.exports = {router};
