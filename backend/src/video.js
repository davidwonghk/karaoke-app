const fs = require("fs");
const range = require('range-parser');
const express = require('express');
const router = express.Router();

var cur = undefined;

const videoDir = "/home/david/workspace/karaoke/videos/"

router.get("/", (req, res) => {
	const videoPath = videoDir + "Twins-恋爱大过[粤语].mp4";
	const videoSize = fs.statSync(videoPath).size;
	//const resHeader = { "Content-Type": "video/x-matroska" };
	const resHeader = { "Content-Type": "video/mp4" };

	const rangeHeader = req.headers.range;
	if (!rangeHeader) {
    const videoStream = fs.createReadStream(videoPath);
    res.writeHead(200, {
			...resHeader,
			"Content-Length": videoSize,
		});

    videoStream.pipe(res);
		return;
	}

	const ranges = range(videoSize, rangeHeader);
	const {start, end} = ranges[0];
	const videoStream = fs.createReadStream(videoPath, { start, end });

	const chunkSize = (end - start + 1);
	res.writeHead(206, {
		...resHeader,
		"Content-Length": chunkSize,
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
	});
	videoStream.pipe(res);
});

module.exports = router;
