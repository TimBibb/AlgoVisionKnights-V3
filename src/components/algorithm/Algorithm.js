import React from 'react';
import './Algorithm.css';
import {
	Card,
	CardContent,
	// IconButton,
	Typography,
	Button,
} from '@material-ui/core';
import Tilt from 'react-tilt';
// import FavoriteIcon from '@material-ui/icons/Favorite';

// Algorithm card for the dashboard.
function Algorithm({ title, description, width, height, inCategory }) {
	console.log(`Render: ${title} card`);

	return (
		<Tilt
			style={{ width: inCategory ? '84%' : 'unset' }}
			options={{ max: 1.5, scale: 1.03 }}>
			<Button id='algorithm' style={{ width: width, height: height }}>
				<Card id='card'>
					<CardContent id='card-content'>
						<div className='CardHeader'>
							<Typography id='card-title'> {title} </Typography>
						</div>
						<div className='CardBody'>
							<Typography id='card-info'>
								{description}
							</Typography>
						</div>
					</CardContent>
				</Card>
			</Button>
		</Tilt>
	);
}

export default Algorithm;
