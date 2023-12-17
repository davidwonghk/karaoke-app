require("dotenv").config();
const SERVICE_PORT = process.env.NODE_DOCKER_PORT;

//------------------------------
// mdns
const mdns = require('mdns');

// advertise a http server on port 4321
const txtRecord = {
	app: 'karaoke',
	service_port: SERVICE_PORT, 
	ws_tv_port: process.env.WEBSOCKET_TV_PORT,
};
const ad = mdns.createAdvertisement(mdns.tcp('http'), 4321, {txtRecord});
ad.start();

//------------------------------
// web service server
const express = require('express')
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express()
const play = require('./play.js');

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
app.listen(SERVICE_PORT, () => {
  console.log(`Server is running on port ${SERVICE_PORT}.`);
});
