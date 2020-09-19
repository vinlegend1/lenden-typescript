import * as React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import CategoryIcons from '../../icons/categories';

export interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
	const categoryList = [
		{ name: 'Books', src: 'book', to: '/products/books' },
		{ name: 'Mobiles', src: 'mobile', to: '/products/mobiles' },
		{ name: 'Gaming CD', src: 'cd', to: '/products/gaming-cd' },
		{
			name: 'Accessories',
			src: 'accessory',
			to: '/products/gaming-accessories',
		},
		{ name: 'Consoles', src: 'console', to: '/products/gaming-consoles' },
	];

	return (
		<React.Fragment>
			<div className='mainCategoryContainer'>
				{categoryList.map((category, index) => (
					<LinkContainer key={index} to={category.to}>
						<div className='categoryBox' style={{ margin: '1rem 0 ' }}>
							<div className='categoryIconBox'>
								<CategoryIcons name={category.src} />
							</div>
							<div className='categoryName'>{category.name.toUpperCase()}</div>
						</div>
					</LinkContainer>
				))}
			</div>
			<hr />
		</React.Fragment>
	);
};

export default Categories;
