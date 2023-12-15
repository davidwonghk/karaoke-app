const queue = require('./queue.js');
const { remote: wss } = require('./wss.js');

const DEFAULT_SONG = "PSY-偶爸甘吶屎.mkv";
var cur = DEFAULT_SONG;
var curId = 0;

function resolver(req) { 
	const id = parseInt(req.query.id);
	if (id > curId) {
		curId = id;
		cur = queue.next().name || DEFAULT_SONG;
		wss.broadcast({play: cur});
	}
	return '/videos/' + encodeURI(cur);
}

function current(req, res) {
	res.json({type: 'play', current: cur});
}

module.exports = {resolver, current};
