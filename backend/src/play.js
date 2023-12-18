const queue = require('./queue.js');
const { remote: wss } = require('./wss.js');
const logger = require('./logger.js');

const DEFAULT_SONG = "PSY-偶爸甘吶屎.mkv";
const payload = {
	type: 'play', 
	current: DEFAULT_SONG,
}
var curId = 'dummy';

function resolver(req) { 
	const id = req.query.id;
	if (id != curId) {
		curId = id;
		payload.current = queue.next().name || DEFAULT_SONG;
		wss.broadcast(payload);
		queue.broadcast();
		logger.debug("requested next song", {id}, payload.current);
	}
	return '/videos/' + encodeURI(payload.current);
}

function current(req, res) {
	res.json(payload);
}

module.exports = {resolver, current};
