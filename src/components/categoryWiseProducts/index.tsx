import * as React from 'react';
import SingleMultipleToggle from '../common/products/singleMultipleToggle';
import { RouteComponentProps, Link } from 'react-router-dom';
import SingleProducts from '../common/products/singleProducts';
import Navbar from '../navbar';
import { Breadcrumb } from 'react-bootstrap';
import _ from 'lodash';
import { LinkContainer } from 'react-router-bootstrap';

export interface CategoryWiseProductsProps extends RouteComponentProps {}

const CategoryWiseProducts: React.FC<CategoryWiseProductsProps> = props => {
	const [activeItem, setActiveItem] = React.useState<'single' | 'multiple'>(
		'single'
	);
	const categoryName = props.location.pathname.split('/')[2];
	const categoryLabel = categoryName
		.split('-')
		.map(n => _.capitalize(n))
		.join(' ');
	return (
		<div className='categoryWiseProducts'>
			<Navbar />
			<Breadcrumb>
				<LinkContainer to='/'>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
				</LinkContainer>
				<LinkContainer to='/'>
					<Breadcrumb.Item>Categories</Breadcrumb.Item>
				</LinkContainer>

				<Breadcrumb.Item active>{categoryLabel}</Breadcrumb.Item>
			</Breadcrumb>
			<SingleMultipleToggle
				activeItem={activeItem}
				handleActiveItemChange={item => setActiveItem(item)}
			/>
			{activeItem === 'single' && <SingleProducts category={categoryName} />}
		</div>
	);
};

export default CategoryWiseProducts;
