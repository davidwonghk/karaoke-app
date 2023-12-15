require("dotenv").config();
const express = require('express')
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express()
const play = require('./play.js');
const PORT = process.env.NODE_DOCKER_PORT;


app.use(cors());
app.use(express.json());
app.use('/queue', require('./queue.js').router);
app.use('/songs', require('./songs.js').router);
app.use('/control', require('./control.js').router);
app.get('/current', play.current);
app.use('/play', proxy(process.env.VIDEO_HOST, {
		proxyReqPathResolver: play.resolver
	}
));

// videos content server, 
// may move to a standalone server in the future
app.use('/videos', express.static('../videos'));


// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
