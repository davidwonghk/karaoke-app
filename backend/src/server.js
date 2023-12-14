require("dotenv").config();
const express = require('express')
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express()
const play = require('./play.js');
const PORT = process.env.NODE_DOCKER_PORT;


app.use(cors());
app.use(express.json());
app.use('/videos', express.static('../videos'));
app.use('/queue', require('./queue.js').router);
app.use('/songs', require('./songs.js').router);
app.get('/play/current', play.current);
app.use('/play', proxy(`http://192.168.8.124:${PORT}`, {
		proxyReqPathResolver: play.resolver
	}
));



// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
