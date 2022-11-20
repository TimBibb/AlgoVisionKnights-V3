import React from 'react';
import './PageToggle.css';

import { Button, ButtonGroup, Typography } from '@material-ui/core';

function PageToggle({ setAlgoPage, algoPage }) {
	const color = localStorage.getItem('accentColor');

	const handleInformationPage = () => {
		setAlgoPage('information');
	};

	const handleVisualizerPage = () => {
		setAlgoPage('visualizer');
	};

	return (
		<ButtonGroup id='button-group' variant='text'>
			<Button
				id='information-button'
				onClick={handleInformationPage}
				style={{
					color: algoPage === 'information' ? color : localStorage.getItem('primaryColor'),
				}}>
				<Typography>Information</Typography>
			</Button>
			<Button
				id='visualizer-button'
				onClick={handleVisualizerPage}
				style={{
					color: algoPage === 'visualizer' ? color : localStorage.getItem('primaryColor'),
				}}>
				<Typography>Visualizer</Typography>
			</Button>
		</ButtonGroup>
	);
}

export default PageToggle;
