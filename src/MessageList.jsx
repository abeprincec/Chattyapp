import React from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

function MessageList({ messages }) {
	//split messages depending on message or notification
	return (
		<div>
			<main className="messages">
				{messages.map(
					message =>
						message.type === 'incomingMessage' ? (
							<Message
								key={message.id}
								username={message.username}
								content={message.content}
								colour={message.colour}
							/>
						) : (
							<Notification key={message.id} content={message.content} />
						)
				)}
			</main>
		</div>
	);
}

export default MessageList;
