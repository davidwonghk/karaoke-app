const { WebSocketServer } = require('ws');

function boardcast(wss, payload) {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(payload))
		}
	});
}

const remote = {
	wss: new WebSocketServer({port: process.env.WEBSOCKET_PORT}),
	boardcast: (payload) => boardcast(remote.wss, payload),
}

const tv = {
	wss: new WebSocketServer({port: process.env.WEBSOCKET_TV_PORT}),
	boardcast: (payload) => boardcast(tv.wss, payload),
}

module.exports = {remote, tv};
