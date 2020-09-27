import * as React from 'react';
import GenericIcons from '../../../icons/generic';
import { SingleProductSlice } from '../../../app/entities/products/singleProducts';
import Product from './../../../classes/productPageForm';
import { RouteComponentProps, withRouter } from 'react-router-dom';
export interface SingleProductBoxProps extends RouteComponentProps {
	productInfo: SingleProductSlice;
}

const SingleProductBox: React.FC<SingleProductBoxProps> = props => {
	const {
		id,
		title,
		isDisabled,
		isWishlist,
		rating,
		ldc,
		description,
		category,
	} = props.productInfo;
	return (
		<div
			className={`singleProductBox ${isDisabled ? 'disabled' : ''}`}
			onClick={() => props.history.push(`/products/${category}/single/${id}`)}>
			<div className='imgContainer'>
				<img src='https://placekitten.com/800/300' alt='' />
			</div>
			<div className='infoContainer'>
				<div className='label-wishlistContainer'>
					<div className='label'>{title}</div>
					<div className='wishlist'>
						<GenericIcons name={`wishlist-${isWishlist ? 1 : 0}`} />
					</div>
				</div>
				<div className={`rating ${Product.getProductCondition(rating)}`}>
					{rating}
					<GenericIcons name='star' />
				</div>
				<div className='ldcContainer'>
					<div className='ldc'>{ldc}</div>
					<GenericIcons name='wallet' />
				</div>
				<div className='description'>{description}</div>
			</div>
		</div>
	);
};

export default withRouter(SingleProductBox);
