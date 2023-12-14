const queue = require('./queue.js');
const DEFAULT_SONG = "PSY-偶爸甘吶屎.mkv";

var cur = DEFAULT_SONG;
var curId = 0;
function resolver(req) { 
	const id = parseInt(req.query.id);
	console.log('play ', id);
	if (id > curId) {
		curId = id;
		cur = queue.next().name || DEFAULT_SONG;
	}
	return '/videos/' + encodeURI(cur);
}

function current(req, res) {
	res.json({playing: cur});
}

module.exports = {resolver, current};
