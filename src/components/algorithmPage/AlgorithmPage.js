import './AlgorithmPage.css';
import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";

// Child Components
import InformationPage from '../informationPage/InformationPage';
import Visualizer from '../visualizer/Visualizer';

function NavigateToDashboard(){
	window.location.href = "/";
}

function AlgorithmPage({ path, type, algoPage }) {

	const[show, setShow] = useState(false);
	const [val, setVal] = useState((localStorage.getItem(path) == "true") || false);

	const [isChecked, setChecked] = useState((localStorage.getItem(path) == "true") || false);
	const onCheckboxChange = (key: string, value: boolean) => {
		localStorage.setItem(path, value.toString())
		setChecked(value)
	};

	return (
		<div className='AlgorithmPage'> 
			<Visualizer path={path} type={type}/>
			{/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
			<div className='container'>
				<div className="button-location">
					<button class="button" onClick={NavigateToDashboard}>Dashboard</button>
					<button class="button2" onClick={()=> setShow(!show)}>More Information</button>
				</div>
				<div className='checkbox-location'>
					<FormControlLabel
						control={
							<Checkbox
								value={isChecked}
								checked={val}
								onChange={(value) => {
									onCheckboxChange("userCheckbox", value.target.checked); 
									setVal(value.target.checked)
								}}
								style={{
								color: "#FFC904"
								}}
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
			{show ? <InformationPage path={path} /> : <br></br>}

			{/* {algoPage === 'visualizer' ? (
				<Visualizer path={path} type={type}/>
			) : (
				<InformationPage path={path} />
			)} */}

		</div>
	);
}

export default AlgorithmPage;
