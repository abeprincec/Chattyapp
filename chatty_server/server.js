const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
	// Make the express server serve static assets (html, javascript, css) from the /public folder
	.use(express.static('public'))
	.listen(PORT, '0.0.0.0', 'localhost', () =>
		console.log(`Listening on ${PORT}`)
	);

// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


//get colour for clients
const getColour = (id) => {
	
	let colours = [
		'doesn"t matter',
		'#0004FF',
		'#00FF46',
		'#00FFFF',
		'#FF7800'
	];

	return colours[id];
};



wss.on('connection', ws => {
	console.log('Client connected');
	
	//clent id  by getting client number
	let clientID = wss.clients.size;

	//send number of client(s)
	const clientInfo = JSON.stringify({
		type: 'connection',
		clients: wss.clients.size,
	});
	wss.clients.forEach(client => {
		client.send(clientInfo);
	});

	//handle messages
	ws.on('message', message => {
		let newMsg = JSON.parse(message);
		let id = uuid();
		newMsg.id = id;
		if (newMsg.type === 'postMessage') {
			newMsg.type = 'incomingMessage';
			newMsg.colour = getColour(clientID);
		} else {
			newMsg.type = 'incomingNotification';
		}

		wss.clients.forEach(client => {
			client.send(JSON.stringify(newMsg));
		});
	});

	// Set up a callback for when a client closes the socket. This usually means they closed their browser.
	ws.on('close', () => console.log('Client disconnected'));
});
