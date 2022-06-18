import './Category.css';
import React from 'react';
import { Link } from 'react-router-dom';

// Child Components
import Algorithm from '../algorithm/Algorithm';

function Category({ inCategory, algorithms }) {
	console.log('Category');
	console.log(algorithms);

	return (
		<div className='Category'>
			{algorithms.map((algorithm) => (
				<Link className='Link' to={algorithm.path}>
					<Algorithm
						title={algorithm.name}
						key={algorithm.name}
						description={algorithm.description}
						width={'100%'}
						height={'auto'}
						inCategory={inCategory}
					/>
				</Link>
			))}
		</div>
	);
}

export default Category;
