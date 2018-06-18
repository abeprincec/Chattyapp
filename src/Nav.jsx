import React from 'react';

function Nav({clients}) {
	return (
		<nav className="navbar">
			<a href="/" className="navbar-brand">
				Chatty
			</a>
			<a className="navbar-clients">{clients}</a>
		</nav>
	);
}

export default Nav;
