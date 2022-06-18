import './MenuToggle.css';
import React from 'react';
import {
	Button,
	ButtonGroup,
	Typography,
	IconButton,
	Menu,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function MenuToggle({ setAlgoPage, algoPage, viewWidth }) {
	const color = '#ff335c';
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleInformationPage = () => {
		setAlgoPage('information');

		if (viewWidth <= 650) {
			closeMenu();
		}
	};

	const handleVisualizerPage = () => {
		setAlgoPage('visualizer');

		if (viewWidth <= 650) {
			closeMenu();
		}
	};

	const openMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	const webToggle = () => {
		return (
			<ButtonGroup
				id={viewWidth > 650 ? 'button-group-web' : null}
				variant='text'>
				<Button
					id='information-button'
					onClick={handleInformationPage}
					style={{
						color: algoPage === 'information' ? color : '#ffffff',
					}}>
					<Typography>Information</Typography>
				</Button>
				<Button
					id='visualizer-button'
					onClick={handleVisualizerPage}
					style={{
						color: algoPage === 'visualizer' ? color : '#ffffff',
					}}>
					<Typography>Visualizer</Typography>
				</Button>
			</ButtonGroup>
		);
	};

	const mobileToggle = () => {
		return (
			<div className='MobileToggle'>
				<IconButton id='more-button' onClick={openMenu}>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id='mobile-menu'
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={closeMenu}>
					{webToggle()}
				</Menu>
			</div>
		);
	};

	return viewWidth > 650 ? webToggle() : mobileToggle();
}

export default MenuToggle;
