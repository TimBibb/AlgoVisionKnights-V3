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

	var completedAlgorithmsPercent = 0;
	var completedAlgorithms = 0;

	Object.keys(algorithms).map((key) =>
		algorithms[key].map((algorithm) => {
			if(localStorage.getItem(algorithm.path) && localStorage.getItem(algorithm.path) == "true"){
				completedAlgorithmsPercent+= 3;
				completedAlgorithms += 1;
			}
				
		}))

	// categories.map((category) => {
	// 	category.path
	// })

	return (
		<div style={{alignItems: "center"}}>
			<h3 className='progress-header'>Completion Progress</h3>
			<h4 className='progress-header'>{completedAlgorithms}/31</h4>
			<ProgressBar variant="warning" now={completedAlgorithmsPercent} style={{width: "80%", marginLeft: "auto", marginRight: "auto", marginBottom: "1em"}}/>
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
