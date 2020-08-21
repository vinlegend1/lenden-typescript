import * as React from 'react';
import { Link } from 'react-router-dom';

export interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
	const categoryList = [
		{ name: 'Books', src: 'book', to: '/categories/books' },
		{ name: 'Mobiles', src: 'mobile', to: '/categories/mobiles' },
		{ name: 'Gaming CD', src: 'cd', to: '/categories/gaming-cd' },
		{
			name: 'Accessories',
			src: 'accessories',
			to: '/categories/gaming-accessories',
		},
		{ name: 'Consoles', src: 'consoles', to: '/categories/gaming-consoles' },
	];

	return (
		<React.Fragment>
			<div className='mainCategoryContainer'>
				{categoryList.map((category, index) => (
					<Link key={index} to={category.to}>
						<div className='categoryBox' style={{ margin: '1rem 0 ' }}>
							<div className='categoryIconBox'>
								<img src={`/icons/categories/${category.src}.svg`} alt='' />
							</div>
							<div className='categoryName'>{category.name.toUpperCase()}</div>
						</div>
					</Link>
				))}
			</div>
			<hr />
		</React.Fragment>
	);
};

export default Categories;
