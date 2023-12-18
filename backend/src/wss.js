const WebSocket = require('ws');
const logger = require('./logger.js');

function broadcast(wss, payload) {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(payload))
		}
	});
}

const remote = {
	wss: new WebSocket.WebSocketServer({port: process.env.KARAOKE_WEBSOCKET_PORT}),
	broadcast: (payload) => broadcast(remote.wss, payload),
};
remote.wss.on('connection', (ws) => {
	const { protocol, url, readyState } = ws;
	logger.info('remote is connected: ', { protocol, url, readyState } );
});

const tv = {
	wss: new WebSocket.WebSocketServer({port: process.env.KARAOKE_TV_PORT}),
	broadcast: (payload) => broadcast(tv.wss, payload),
};
tv.wss.on('connection', (ws) => {
	const { protocol, url, readyState } = ws;
	logger.info('tv is connected: ', { protocol, url, readyState } );
});

module.exports = {remote, tv};
