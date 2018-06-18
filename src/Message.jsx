import React from 'react';

function Message({ colour, content, username }) {
	return (
		<div>
			<div className="message">
				<span style={{ color: colour }} className="message-username">
					{username}
				</span>
				<span className="message-content">{content}</span>
			</div>
		</div>
	);
}

export default Message;
