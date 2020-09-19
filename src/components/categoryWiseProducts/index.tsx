import * as React from 'react';
import SingleMultipleToggle from '../common/products/singleMultipleToggle';
import MainNav from '../navbar/mainNav';
import { RouteComponentProps, Link } from 'react-router-dom';
import SingleProducts from '../common/products/singleProducts';
import SideNav from '../navbar/sideNav';
import { Breadcrumb } from 'react-bootstrap';
import _ from 'lodash';

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
			<MainNav />
			<SideNav />
			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to='/'>Home</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					<Link to='/'>Categories</Link>
				</Breadcrumb.Item>
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
