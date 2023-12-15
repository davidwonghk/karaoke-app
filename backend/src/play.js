const queue = require('./queue.js');
const { remote: wss } = require('./wss.js');

const DEFAULT_SONG = "PSY-偶爸甘吶屎.mkv";
const payload = {
	type: 'play', 
	current: DEFAULT_SONG,
}
var curId = 0;

function resolver(req) { 
	const id = parseInt(req.query.id);
	if (id > curId) {
		curId = id;
		payload.current = queue.next().name || DEFAULT_SONG;
		wss.broadcast(payload);
		queue.broadcast();
	}
	return '/videos/' + encodeURI(payload.current);
}

function current(req, res) {
	res.json(payload);
}

module.exports = {resolver, current};
