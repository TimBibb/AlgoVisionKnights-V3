import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

// Child components
import NavGroup from '../navgroup/NavGroup';

// Material UI components
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@material-ui/core/';
import clsx from 'clsx';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	burger: {
		backgroundColor: '#000000',
	},
	drawer: {
		backgroundColor: '#000000',
		color: '#ffffff',
		position: 'inherit',
		width: '200px',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	toolbar: theme.mixins.toolbar,
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: '0px',
		backgroundColor: '#000000',
	},
}));

function Navigation({
	open,
	toggleDrawer,
	setPage,
	viewWidth,
	page,
	categories,
	algorithms,
}) {
	const [expanded, setExpanded] = React.useState('Dashboard');

	// Handles panel clicks
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded || panel === 'Dashboard' ? panel : false);
		setPage(panel);
	};

	// Instantiating useStyles
	const classes = useStyles();

	return (
		// If we want to add a line to the navigator:
		// <div className='Navigation' style={{borderRight: "0.5px solid #FFC904"}}></div>
		<div className='Navigation'>
			<Drawer
				id='drawer'
				variant={viewWidth > 1275 ? 'permanent' : null}
				open={open}
				onClose={toggleDrawer}
				classes={{
					paper:
						viewWidth <= 1275
							? classes.burger
							: clsx({
									[classes.drawer]: open,
									[classes.drawerClose]: !open,
							  }),
				}}>
				<div id='toolbar-container' className={classes.toolbar}>
					<Typography id='nav-title'>AVK</Typography>
				</div>
				<List>
					
					<Link className='Link' to='/'>
						<ListItem
							id='dashboard-nav-button'
							style={{
								color:
									page === 'Dashboard'
										? '#FFC904'
										: '#ffffff',
							}}
							onClick={handleChange('Dashboard')}
							button>
							<ListItemText>Dashboard</ListItemText>
						</ListItem>
					</Link>
					{categories.map((category, i) => {
						return (
							<Link className='Link' to={category.path}>
								<NavGroup
									title={category.title}
									algorithms={algorithms[category.path]}
									key={category.title}
									panel={category.title}
									expanded={expanded}
									handleChange={handleChange}
								/>
							</Link>
						);
					})}
				</List>
			</Drawer>
		</div>
	);
}

export default Navigation;
