import React, { Component } from 'react';

class Chatbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			username: this.props.currentUser.name,
		};
	}

	//handle events
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	//handle new messages events
	newMsg = e => {
		if (e.key == 'Enter') {
			if (this.state.message === '') {
				return;
			}

			this.props.handleNewMsg(this.state.username, this.state.message);
			e.target.value = '';
			this.handleChange(e);
		}
	};

	//handle change user events
	changeUser = e => {
		if (e.key === 'Enter') {
			if (this.state.username === '') {
				return;
			}
			this.setState({ username: this.state.username });
			this.props.changeUser(this.state.username);
		}
	};

	render() {
		const { username, message } = this.state;
		return (
			<footer className="chatbar">
				<input
					name="username"
					className="chatbar-username"
					placeholder="Your Name (Optional)"
					value={username}
					onChange={this.handleChange}
					onKeyPress={this.changeUser}
				/>
				<input
					name="message"
					className="chatbar-message"
					placeholder="Type a message and hit ENTER"
					value={message}
					onChange={this.handleChange}
					onKeyPress={this.newMsg}
				/>
			</footer>
		);
	}
}

export default Chatbar;
