import * as React from 'react';
import GenericIcons from '../../icons/generic';

export interface SingleProductsProps {}

const SingleProducts: React.FC<SingleProductsProps> = () => {
	const products = [
		{
			title:
				'Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill. Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill.',
			ldc: 321,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque laudantium veniam ex alias atque! Itaque dolore quas cupiditate a est!',
			rating: 4.5,
			wishlist: false,
			disabled: false,
		},
		{
			title:
				'Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill. Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill.',
			ldc: 654,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique magnam voluptatum odio quas doloribus eius!',
			rating: 3.4,
			wishlist: true,
			disabled: false,
		},
		{
			title: 'Iphone 11 - 32 GB , Black Colour',
			ldc: 654,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique magnam voluptatum odio quas doloribus eius!',
			rating: 2.4,
			wishlist: false,
			disabled: false,
		},
	];

	const getProductCondition = (rating: number) => {
		if (rating > 4) return 'good';
		else if (rating > 3) return 'average';
		else if (rating > 2) return 'bad';
	};

	return (
		<div className='singleProductsContainer'>
			{products.map(product => (
				<div className={`singleProduct ${product.disabled ? 'disabled' : ''}`}>
					<div className='imgContainer'>
						<img src='https://placekitten.com/800/300' alt='' />
					</div>
					<div className='infoContainer'>
						<div className='label-wishlistContainer'>
							<div className='label'>{product.title}</div>
							<div className='wishlist'>
								<GenericIcons name={`wishlist-${product.wishlist ? 1 : 0}`} />
							</div>
						</div>
						<div className={`rating ${getProductCondition(product.rating)}`}>
							{product.rating}
							<GenericIcons name='star' />
						</div>
						<div className='ldc'>
							{product.ldc}
							<GenericIcons name='wallet' />
						</div>
						<div className='description'>{product.description}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default SingleProducts;
