const queue = require('./queue.js');

var cur = undefined;
var curId = 0;
function resolver(req) { 
	const id = parseInt(req.query.id);
	if (id > curId) {
		curId = id;
		cur = queue.next().name;
	}
	return '/videos/' + encodeURI(cur || "PSY-偶爸甘吶屎.mkv");
}

module.exports = {resolver};
