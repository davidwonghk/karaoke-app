require("dotenv").config();
const PORT = parseInt(process.env.KARAOKE_SERVER_PORT);
const MDNS_PORT = parseInt(process.env.KARAOKE_MDNS_PORT);
const TVPORT = parseInt(process.env.KARAOKE_TV_PORT);
const FRONTEND_DIRECTORY = process.env.KARAOKE_FRONTEND_DIRECTORY;
const VIDEO_DIRECTORY = process.env.KARAOKE_VIDEO_DIRECTORY;

//------------------------------
// mdns
const mdns = require('mdns');

// advertise a http server on port 4321
const txtRecord = {
	app: 'karaoke',
	wsport: TVPORT,
	port: PORT,
};
const ad = mdns.createAdvertisement(mdns.tcp('http'), MDNS_PORT, {txtRecord});
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
app.use('/play', proxy(process.env.KARAOKE_VIDEO_HOST, {
		proxyReqPathResolver: play.resolver
	}
));
// frontend client content
if (!!FRONTEND_DIRECTORY) {
	app.use('/app', express.static(FRONTEND_DIRECTORY));
}
// videos content server, 
// may move to a standalone server in the future
if (!!VIDEO_DIRECTORY) {
	app.use('/videos', express.static(VIDEO_DIRECTORY));
}

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
