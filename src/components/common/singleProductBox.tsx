import * as React from 'react';
import GenericIcons from '../../icons/generic';
import { SingleProductSlice } from '../../app/entities/singleProducts';

export interface SingleProductBoxProps {
	productInfo: SingleProductSlice;
}

const getProductCondition = (rating: number) => {
	if (rating > 4) return 'good';
	else if (rating > 3) return 'average';
	else if (rating > 2) return 'bad';
};

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
				<div className={`rating ${getProductCondition(rating)}`}>
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
