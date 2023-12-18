const WebSocket = require('ws');

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

const tv = {
	wss: new WebSocket.WebSocketServer({port: process.env.KARAOKE_TV_PORT}),
	broadcast: (payload) => broadcast(tv.wss, payload),
};

tv.wss.on('connection', (ws) => {
	console.log(new Date(Date.now()), ': tv is connected');
});

module.exports = {remote, tv};
