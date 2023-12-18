const WebSocket = require('ws');
const logger = require('./logger.js');

function broadcast(wss, payload) {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			logger.debug(`broadcast to client ${client._socket.remoteAddress}: ${(payload&&payload.type) || payload}`);
			client.send(JSON.stringify(payload))
		}
	});
}

function logOnConnection(wss, name) {
	wss.on('connection', (ws, req) => {
		const address = req.socket.remoteAddress;
		logger.info(`${name} is connected: ${address}`);
		ws.on('message', (data) => logger.debug(`${name} sends ${data}`));
		ws.on('close', () => logger.info(`${name} is closed: ${address}`));
	});
}

const remote = {
	wss: new WebSocket.WebSocketServer({port: process.env.KARAOKE_WEBSOCKET_PORT}),
	broadcast: (payload) => broadcast(remote.wss, payload),
};
logOnConnection(remote.wss, 'remote');

const tv = {
	wss: new WebSocket.WebSocketServer({port: process.env.KARAOKE_TV_PORT}),
	broadcast: (payload) => broadcast(tv.wss, payload),
};
logOnConnection(tv.wss, 'tv');


module.exports = {remote, tv};
