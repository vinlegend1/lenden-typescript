import * as React from 'react';
import GenericIcons from '../../../icons/generic';
import { SingleProductSlice } from '../../../app/entities/products/singleProducts';
import Product from './../../../classes/productPageForm';
export interface SingleProductBoxProps {
	productInfo: SingleProductSlice;
}

const SingleProductBox: React.FC<SingleProductBoxProps> = props => {
	const {
		title,
		isDisabled,
		isWishlist,
		rating,
		ldc,
		description,
	} = props.productInfo;
	return (
		<div className={`singleProductBox ${isDisabled ? 'disabled' : ''}`}>
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

export default SingleProductBox;
