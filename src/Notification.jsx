import React from 'react';

//

function Notification(props) {
	return (
       
		<div className="message system">
			<span className="notification-content">{props.content}</span>
		</div>
	);
}

export default Notification;
