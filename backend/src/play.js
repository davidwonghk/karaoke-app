const logger = require('./logger.js');
const queue = require('./queue.js');
const { remote: wss } = require('./wss.js');
const { findSong } = require('./songs.js');

const DEFAULT_SONG = {
	name: "冇點歌",
	loc: "PSY-偶爸甘吶屎.mkv",
};
var cur = DEFAULT_SONG;
var curId = 'dummy';

function resolver(req) { 
	const id = req.query.id;
	if (id != curId) {
		curId = id;
		cur = findSong(queue.next().name) || DEFAULT_SONG;

		wss.broadcast(payload());
		queue.broadcast();

		logger.debug(`requested next song ${cur.name}(${id})`);
	}
	return '/videos/' + encodeURI(cur.loc);
}

function current(req, res) {
	res.json(payload());
}

function payload() {
	return {type: 'play', current: cur.name};
}

module.exports = {resolver, current};
