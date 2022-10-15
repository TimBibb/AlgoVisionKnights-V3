import './Dashboard.css';
import React from 'react';
import Algorithm from '../algorithm/Algorithm';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Col, Row } from 'react-bootstrap';

import algorithms from '../algorithmList/Algorithms';

function Dashboard({ categories, inCategory }) {
	console.log('Dashboard');

	var completedAlgorithms = 0;

	Object.keys(algorithms).map((key) =>
		algorithms[key].map((algorithm) => {
			if(localStorage.getItem(algorithm.path) && localStorage.getItem(algorithm.path) == "true"){
				completedAlgorithms+= 3;
			}
				
		}))

	// categories.map((category) => {
	// 	category.path
	// })

	return (
		<div style={{alignItems: "center"}}>
			<ProgressBar animated variant="warning" now={completedAlgorithms} label={`${completedAlgorithms}%`} style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}/>
			<div className='Dashboard'>
				<br/><br/>
				{categories.map((category) => (
					<Link className='Link' to={category.path}>
						<Algorithm
							title={category.title}
							description={category.description}
							key={category.title}
							width={320}
							height={265}
							inCategory={inCategory}
						/>
					</Link>
				))}

			</div>
		</div>
	);
}

export default Dashboard;
