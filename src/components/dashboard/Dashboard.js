import './Dashboard.css';
import React from 'react';
import Algorithm from '../algorithm/Algorithm';
import { Link } from 'react-router-dom';

function Dashboard({ categories, algorithms, inCategory }) {
	console.log('Dashboard');

	return (
		<div className='Dashboard'>
			{categories.map((category) => (

				// algorithms[category.path].forEach(algorithm => {
					// {console.log(category.title)}
					// {console.log(algorithm.name)}
					<Link className='Link' to={category.path}>
						{/* {console.log(algorithm.name)} */}
						<Algorithm
							title={category.title}
							// algo={algorithm.name}
							description={category.description}
							key={category.path}
							width={320}
							height={265}
							inCategory={inCategory}
						/>
					</Link>
				// })
			))}
			{/* {algorithms.map((algo) => (
				// algorithms[category.path].forEach(algorithm => {
					// {console.log(algorithm.name)}
					<Link className='Link' to={algo.path}>
						<Algorithm
							title={algo.name}
							algo={algo.name}
							description={algo.type}
							key={algo.path}
							width={320}
							height={265}
							inCategory={inCategory}
						/>
					</Link>
				// })
			))} */}
		</div>
	);
}

export default Dashboard;
