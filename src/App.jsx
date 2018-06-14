import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

const data = {
	currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
	messages: [
		{
			id: 0,
			username: 'Bob',
			content: 'Has anyone seen my marbles?',
		},
		{
			id: 1,
			username: 'Anonymous',
			content:
				'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
		},
	],
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: { name: 'Bob' },
			messages: [],
		};
		this.socket = null;
	}

	connect = () => {
		this.socket = new WebSocket('ws://localhost:3001', 'protocolOne');
		this.socket.addEventListener('open', () => {
			//	this.socket.send('Hello Server!');
		});
	};
	componentDidMount() {
		this.connect();
		console.log(`Connected to server`);
		console.log('componentDidMount <App />');
		setTimeout(() => {
			console.log('Simulating incoming message');

			// Add a new message to the list of messages in the data store
			const newMessage = {
				id: 10,
				username: 'Michelle',
				content: 'Hello there!',
			};
			//const messages = this.state.messages.concat(newMessage);
			// Update the state of the app component.
			// Calling setState will trigger a call to render() in App and all child components.
			this.setState({
				messages: [newMessage],
			});
		}, 3000);

		this.socket.addEventListener('message', event => {
			let message = JSON.parse(event.data);
			console.log(message);
			this.setState({
				messages: [...this.state.messages, message],
			});
		});
	}

	addMessage = (username, content) => {
		const sendMsg = {
			username,
			content,
		};

		this.socket.send(JSON.stringify(sendMsg));
	};

	render() {
		console.log(this.state);
		let { currentUser } = this.state;
		return (
			<div>
				<nav className="navbar">
					<a href="/" className="navbar-brand">
						Chatty
					</a>
				</nav>
				<MessageList messages={this.state.messages}> </MessageList>

				<Chatbar currentUser={currentUser} handleNewMsg={this.addMessage} />
			</div>
		);
	}
}
export default App;
