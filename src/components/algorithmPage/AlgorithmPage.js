import './AlgorithmPage.css';
import React, { useState } from 'react';

// Child Components
import InformationPage from '../informationPage/InformationPage';
import Visualizer from '../visualizer/Visualizer';

function NavigateToDashboard(){
	window.location.href = "/";
}

function AlgorithmPage({ path, type, algoPage }) {

	const[show, setShow] = useState(false);

	return (
		<div className='AlgorithmPage'> 
			<Visualizer path={path} type={type}/>
			<br/>
			<div class="button-location">
				<button class="button" onClick={NavigateToDashboard}>Dashboard</button>
				<button class="button2" onClick={()=> setShow(!show)}>More Information</button>
				{show && <InformationPage path={path} />}
			</div>
			<br/><br/>
			

			{/* {algoPage === 'visualizer' ? (
				<Visualizer path={path} type={type}/>
			) : (
				<InformationPage path={path} />
			)} */}

		</div>
	);
}

export default AlgorithmPage;
