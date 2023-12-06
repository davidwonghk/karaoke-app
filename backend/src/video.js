const fs = require("fs");
const range = require('range-parser');
const express = require('express');
const router = express.Router();
const queue = require('./queue.js');


const videoDir = "/home/david/workspace/karaoke/videos/";

var cur = undefined;
function currentVideo(next=false) {
	if (next) {
		cur = queue.next();
	}
	return cur ? videoDir + cur : videoDir + "test1.mp4";
}

function getContentType(path) {
	if (path.endsWith('mp4')) {
		return 'video/mp4';
	}
	else if (path.endsWith('mkv')) {
 		return "video/x-matroska";
	}
}

router.get("/", (req, res) => {
	const rangeHeader = req.headers.range;
	if (rangeHeader) {
		var videoPath = currentVideo();
		var videoSize = fs.statSync(videoPath).size;
		var {start, end} = range(videoSize, rangeHeader)[0];
		if (start === 0) {
			videoPath = currentVideo(true);
			videoSize = fs.statSync(videoPath).size;
			const ranges = range(videoSize, rangeHeader);
			start = ranges[0].start;
			end = ranges[0].end;
		}
		console.log(videoPath, start, end);
		const videoStream = fs.createReadStream(videoPath, { start, end });

		const chunkSize = (end - start + 1);
		res.writeHead(206, {
			"Content-Type": getContentType(videoPath),
			"Content-Length": chunkSize,
			"Accept-Ranges": "bytes",
			"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		});
		videoStream.pipe(res);
	}
	else {
		const videoPath = currentVideo(true);
		const videoSize = fs.statSync(videoPath).size;
    const videoStream = fs.createReadStream(videoPath);
		console.log(videoPath);
    res.writeHead(200, {
			"Content-Type": getContentType(videoPath),
			"Content-Length": videoSize,
			"Accept-Ranges": "bytes",
		});
		videoStream.pipe(res);
	}
});

module.exports = {router};
