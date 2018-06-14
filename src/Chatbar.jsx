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
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		const { username, message } = this.state;
		const newMsg = e => {
			if (e.key == 'Enter') {
				this.props.handleNewMsg(this.state.username, this.state.message);
				e.target.value = '';
				this.handleChange(e);
			}
		};
		return (
			<footer className="chatbar">
				<input
					name="username"
					className="chatbar-username"
					placeholder="Your Name (Optional)"
					value={username}
					onChange={this.handleChange}
				/>
				<input
					name="message"
					className="chatbar-message"
					placeholder="Type a message and hit ENTER"
					value={message}
					onChange={this.handleChange}
					onKeyPress={newMsg}
				/>
			</footer>
		);
	}
}

export default Chatbar;
