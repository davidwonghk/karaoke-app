const express = require('express');
const router = express.Router();

const videoDir = "/home/david/workspace/karaoke/videos/";
var currentVideo = 0;

router.get("/", (req, res) => {
	//const videoPath = videoDir + "Twins-恋爱大过[粤语].mp4";
	//const resHeader = { "Content-Type": "video/x-matroska" };
	const resHeader = { "Content-Type": "video/mp4" };

	const rangeHeader = req.headers.range;
	if (!rangeHeader) {
		currentVideo = 1 - currentVideo;
		console.log("first access", currentVideo);
		const videoPath = videos[currentVideo];
		const videoSize = fs.statSync(videoPath).size;
    const videoStream = fs.createReadStream(videoPath);
    res.writeHead(200, {
			...resHeader,
			"Content-Length": videoSize,
		});

    videoStream.pipe(res);
		return;
	}

	const videoPath = videos[currentVideo];
	const videoSize = fs.statSync(videoPath).size;
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
