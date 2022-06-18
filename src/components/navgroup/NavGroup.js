import React from 'react';
import './NavGroup.css';
import { Link } from 'react-router-dom';

// Material UI
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	ListItem,
	ListItemText,
} from '@material-ui/core';

// Child Components
import NavLink from '../navlink/NavLink';

function NavGroup({ title, algorithms, panel, expanded, handleChange }) {
	return (
		<Accordion
			id='nav-group'
			expanded={expanded === panel}
			onChange={handleChange(panel)}>
			<ListItem id='nav-group-button' button>
				<AccordionSummary id='accordion-summary'>
					<ListItemText
						id='nav-item-text'
						style={{
							color: expanded === panel ? '#ff335c' : '#ffffff',
						}}>
						{title}
					</ListItemText>
				</AccordionSummary>
			</ListItem>
			<AccordionDetails id='accordion-details' ref={React.createRef()}>
				{algorithms.map((algorithm, i) => (
					<Link className='Link' to={algorithm.path}>
						<NavLink name={algorithm.name} key={algorithm.name} />
					</Link>
				))}
			</AccordionDetails>
		</Accordion>
	);
}

export default NavGroup;
