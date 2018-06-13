import React, { Component } from 'react';

class Chatbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			username: this.props.currentUser.name,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ message: event.target.value });
	}

	render() {
		const { username } = this.state;
		const newMsg = e => {
			//console.log(`ddd`)
			if (e.key == 'Enter') {
				// console.log(this.state.message);
				// console.log(this.state.username);
				this.props.handleNewMsg(this.state.username, this.state.message);
			}
			// const username = e.target.elements.username;
			// const message = e.target.elements.message;

			//console.log( message);
		};
		return (
			<footer className="chatbar">
				<input
					//name="username"
					className="chatbar-username"
					placeholder="Your Name (Optional)"
					value={username}
				/>
				<input
					name="message"
					className="chatbar-message"
					placeholder="Type a message and hit ENTER"
					value={this.state.value}
					onChange={this.handleChange}
					onKeyPress={newMsg}
				/>
			</footer>
		);
	}
}

export default Chatbar;
