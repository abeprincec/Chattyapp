import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';
import Nav from './Nav.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: { name: 'Anonymous' },
			messages: [],
			clients: 0,
			colour: null,
		};
		this.socket = null;
	}
	//connect to web socket
	connect = () => {
		this.socket = new WebSocket('ws://localhost:3001', 'protocolOne');
		this.socket.addEventListener('open', () => {
		});
	};
	componentDidMount() {
		this.connect();
		//set message depending on type
		this.socket.addEventListener('message', event => {
			let message = JSON.parse(event.data);
			switch (message.type) {
				case 'incomingMessage':
				
					this.setState({
						messages: [...this.state.messages, message],
					});
					break;
				case 'incomingNotification':
					this.setState({
						currentUser: { name: message.username },
						messages: [...this.state.messages, message],
					});

					break;
				case 'connection':
				
					this.setState({
						clients: message.clients,
					});
					break;
			}
		});
	}

	//add message to chat window
	addMessage = (username, content) => {
		const sendMsg = {
			type: 'postMessage',
			username,
			content,
		};
		this.socket.send(JSON.stringify(sendMsg));
	};

	//change username
	changeUser = username => {
		let { currentUser } = this.state;

		const oldUsername = currentUser.name;

		const sendNotification = {
			type: 'postNotification',
			username,
			content: `${oldUsername} has changed their name to ${username}`,
		};
		this.socket.send(JSON.stringify(sendNotification));
	};

	render() {
		let { currentUser, clients, messages,  } = this.state;
		return (
			<div>
				<Nav clients={clients} />
				<MessageList messages={messages}> </MessageList>

				<Chatbar
					currentUser={currentUser}
					handleNewMsg={this.addMessage}
					changeUser={this.changeUser}
				/>
			</div>
		);
	}
}
export default App;
