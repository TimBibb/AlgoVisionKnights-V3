import './Navigation.css';
import React, { useEffect } from 'react';
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
	Button
} from '@material-ui/core/';
import clsx from 'clsx';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';

var useStyles = makeStyles((theme) => ({
	burger: {
		backgroundColor: localStorage.getItem('backgroundColor'),
	},
	drawer: {
		backgroundColor: localStorage.getItem('backgroundColor'),
		color: localStorage.getItem('primaryColor'),
		position: 'inherit',
		width: '200px',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	toolbar: theme.mixins.toolbar,
	drawerClose: {
		backgroundColor: localStorage.getItem('backgroundColor'),
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: '0px',
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
	var classes = useStyles();

	useEffect(() => {useStyles = makeStyles((theme) => ({
		burger: {
			backgroundColor: localStorage.getItem('backgroundColor'),
		},
		drawer: {
			backgroundColor: localStorage.getItem('backgroundColor'),
			color: localStorage.getItem('primaryColor'),
			position: 'inherit',
			width: '200px',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		toolbar: theme.mixins.toolbar,
		drawerClose: {
			backgroundColor: localStorage.getItem('backgroundColor'),
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: '0px',
		},
	}));}, [localStorage])

	useEffect(() => {classes = useStyles}, [useStyles])

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
					<Link className='Link' to='/'>
						<Button onClick={handleChange('Dashboard')} ><Typography id='nav-title'>AVK</Typography></Button>
					</Link>
				</div>
				<List>
					
					<Link className='Link' to='/'>
						<ListItem
							id='dashboard-nav-button'
							style={{
								color:
									page === 'Dashboard'
										? localStorage.getItem('accentColor')
										: localStorage.getItem('primaryColor'),
							}}
							onClick={handleChange('Dashboard')}
							button>
							<ListItemText>Dashboard</ListItemText>
						</ListItem>
					</Link>
					{categories.map((category, i) => {
						return (
							<NavGroup
								title={category.title}
								algorithms={algorithms[category.path]}
								key={category.title}
								panel={category.title}
								expanded={expanded}
								handleChange={handleChange}
							/>
						);
					})}
				</List>
			</Drawer>
		</div>
	);
}

export default Navigation;
