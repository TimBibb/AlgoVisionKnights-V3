import './Category.css';
import React from 'react';
import { Link } from 'react-router-dom';

// Child Components
import Algorithm from '../algorithm/Algorithm';

function Category({ category, inCategory, subcategories }) {
	console.log('Category');
	console.log(subcategories);

	return (
		<div className='Category'>
			{subcategories.map((subcategory, i) => (
				<Link className='Link' to={category.path + "/"+ subcategory.path}>
					<Algorithm
						title={subcategory.name}
						key={subcategory.name}
						description={subcategory.description}
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
