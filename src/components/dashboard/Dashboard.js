import './Dashboard.css';
import React from 'react';
import Algorithm from '../algorithm/Algorithm';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Col, Row } from 'react-bootstrap';
import Tilt from 'react-tilt';
import algorithms from '../algorithmList/Algorithms';
import {
	Card,
	CardContent,
	// IconButton,
	Typography,
	Button,
} from '@material-ui/core';
import SelectionCard from './SelectionCard'


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
			<ProgressBar variant="warning" now={completedAlgorithmsPercent} style={{maxWidth: "1000px", marginLeft: "auto", marginRight: "auto", marginBottom: "1em"}}/>

			<div style={{alignItems: 'center'}}>
				{Object.keys(algorithms).map((key) =>
					<SelectionCard categoryName={algorithms[key][0].category} category={algorithms[key]}/>
				)}

				{/* {Object.keys(algorithms).map((key) => {
					<div className='category'>
						{algorithms[key].map((algorithm) => {
							<a href="#">{algorithm}</a>
						})}
					</div>
					
				})} */}
			</div>
		</div>
	);
}

export default Dashboard;
