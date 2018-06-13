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
			loading: true,
			data: data,
		};
	}
	componentDidMount() {
		console.log('componentDidMount <App />');
		setTimeout(() => {
			console.log('Simulating incoming message');

			// Add a new message to the list of messages in the data store
			const newMessage = {
				id: 3,
				username: 'Michelle',
				content: 'Hello there!',
			};
			const messages = this.state.data.messages.concat(newMessage);
			// Update the state of the app component.
			// Calling setState will trigger a call to render() in App and all child components.
			this.setState({
				data: { ...this.state.data, messages: messages },
			});
		}, 3000);
	}

	handlemsgInput = (username, content) => {
		const uniqid = Date.now();
		const newMessage = {
			id: this.state.data.messages.length + 1,
			username,
			content,
		};
		const messages = this.state.data.messages.concat(newMessage);
		this.setState({
			data: { ...this.state.currentUser, messages: messages },
		});
		console.log(this.state.data);
	};

	render() {
		let { messages, currentUser } = this.state.data;
		return (
			<div>
				<nav className="navbar">
					<a href="/" className="navbar-brand">
						Chatty
					</a>
				</nav>
				<MessageList messages={messages}> </MessageList>

				<Chatbar currentUser={currentUser} handleNewMsg={this.handlemsgInput} />
			</div>
		);
	}
}
export default App;
