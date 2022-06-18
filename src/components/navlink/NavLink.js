import './NavLink.css';
import React from 'react';

// Material UI
import { ListItem, ListItemText } from '@material-ui/core';

function NavLink({ name }) {
	return (
		<ListItem id='accordian-button' button>
			<ListItemText id='accordian-text'>{name}</ListItemText>
		</ListItem>
	);
}

export default NavLink;
