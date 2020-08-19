import * as React from 'react';

export interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
	const categoryList = [
		{ name: 'Books', src: 'book' },
		{ name: 'Mobiles', src: 'mobile' },
		{ name: 'Gaming CD', src: 'cd' },
		{ name: 'Accessories', src: 'accessories' },
		{ name: 'Consoles', src: 'consoles' },
	];

	return (
		<React.Fragment>
			<div className='mainCategoryContainer'>
				{categoryList.map(category => (
					<div className='categoryBox' style={{ margin: '1rem 0 ' }}>
						<div className='categoryIconBox'>
							<img src={`/icons/categories/${category.src}.svg`} alt='' />
						</div>
						<div className='categoryName'>{category.name.toUpperCase()}</div>
					</div>
				))}
			</div>
			<hr />
		</React.Fragment>
	);
};

export default Categories;
