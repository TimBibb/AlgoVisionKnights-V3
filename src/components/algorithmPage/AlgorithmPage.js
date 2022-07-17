import './AlgorithmPage.css';
import React from 'react';

// Child Components
import InformationPage from '../informationPage/InformationPage';
import Visualizer from '../visualizer/Visualizer';

function AlgorithmPage({ path, type, algoPage }) {
	return (
		<div className='AlgorithmPage'> 
			<Visualizer path={path} type={type}/>
			<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
			<InformationPage path={path} />
			
			{/* {algoPage === 'visualizer' ? (
				<Visualizer path={path} type={type}/>
			) : (
				<InformationPage path={path} />
			)} */}

		</div>
	);
}

export default AlgorithmPage;
