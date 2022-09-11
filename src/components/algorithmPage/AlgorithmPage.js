import './AlgorithmPage.css';
import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";

// Child Components
import InformationPage from '../informationPage/InformationPage';
import Visualizer from '../visualizer/Visualizer';


function NavigateToDashboard(){
	window.location.href = "/";
}

function AlgorithmPage({ path, type, algoPage }) {

	const[show, setShow] = useState(false);
	const [val, setVal] = useState(false);

	return (
		<div className='AlgorithmPage'> 
			<Visualizer path={path} type={type}/>
			<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
			<div className='container'>
				<div className="button-location">
					<button class="button" onClick={NavigateToDashboard}>Dashboard</button>
					<button class="button2" onClick={()=> setShow(!show)}>More Information</button>
				</div>
				<div className='checkbox-location'>
					<FormControlLabel
						control={
							<Checkbox
								checked={val}
								onChange={(e) => setVal(e.target.checked)}
								style={{
								color: "#FFC904"
								}}
								value="Completed?"
							/>
						}
						label={
						<Typography variant='h5' style={{ color: "#FFFFFF" }}>
							<h4>Completed?</h4>
						</Typography>
						}
					/>
				</div>
			</div>
			{show && <InformationPage path={path} />}
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
