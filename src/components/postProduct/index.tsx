import * as React from 'react';
import SubNav from '../common/subNav';
import CategoryIcons from '../../icons/categories';
import { RouteComponentProps } from 'react-router-dom';

export interface PostProductProps extends RouteComponentProps {}

const PostProduct: React.FC<PostProductProps> = props => {
	return (
		<React.Fragment>
			<SubNav title='Post your product' />
			<div className='container chooseCategory'>
				<h1>Choose a Category</h1>
				<div className='categoryContainer'>
					<div className='row'>
						<div
							className='col col-l'
							onClick={() => props.history.push('/post-product/book')}>
							<CategoryIcons name='book' />
							<p>Books</p>
						</div>
						<div className='col'>
							<CategoryIcons name='mobile' />
							<p>Mobiles</p>
						</div>
					</div>
					<div className='row'>
						<div
							className='col col-l'
							onClick={() => props.history.push('/post-product/gaming-cd')}>
							<CategoryIcons name='cd' />
							<p>Gaming CD's</p>
						</div>
						<div className='col'>
							<CategoryIcons name='accessory' />
							<p>Accessories</p>
						</div>
					</div>
					<div className='row'>
						<div
							className='col'
							style={{ borderBottom: 'none' }}
							onClick={() =>
								props.history.push('/post-product/gaming-console')
							}>
							<CategoryIcons name='console' />
							<p>Consoles</p>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default PostProduct;
