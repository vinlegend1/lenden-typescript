import * as React from 'react';
import GenericIcons from '../../icons/generic';

export interface MultipleProductsProps {}

const MultipleProducts: React.FC<MultipleProductsProps> = () => {
	const ref = React.useRef<HTMLDivElement>(null);
	const [a, setA] = React.useState('');

	return (
		<div className='multipleProductsContainer'>
			<div className='multipleProducts'>
				<div
					className={`swipeRight ${a}`}
					onClick={() => {
						console.log(
							ref.current?.scrollLeft,
							ref.current!.scrollWidth - window.outerWidth
						);
						if (
							ref.current!.scrollLeft >
							ref.current!.scrollWidth - window.outerWidth
						)
							setA('gayab');
						ref.current?.scrollBy({
							left: 150,
							behavior: 'smooth',
						});
					}}>
					<GenericIcons name='cross-black' />
				</div>
				<div className='ldc-wishlistContainer'>
					<div className='ldc-infoContainer'>
						<div className='productsInfo'>Set of (5) Products</div>
						<div className='ldc'>
							Total LDC: <span> 201</span>
							<GenericIcons name='wallet' />
						</div>
					</div>
					<div className='wishlist'>
						<GenericIcons name={`wishlist-1`} />
					</div>
				</div>

				<div
					className='productsContainer'
					ref={ref}
					onScroll={e => {
						if (
							e.currentTarget.scrollLeft >
							e.currentTarget.scrollWidth - window.innerWidth
						)
							setA('gayab');
						else setA('');
					}}>
					<div className='product'>
						<img src='https://placekitten.com/800/300' alt='' />
						<div className='title'>
							Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill Iphone
							11 - 32 GB , Black Colour, Dual Camera with OG Bill
						</div>
						<div className={`rating good`}>
							3.5
							<GenericIcons name='star' />
						</div>
					</div>
					<div className='plusBox'>
						<GenericIcons name='plus' />
					</div>
					<div className='product'>
						<img src='https://placekitten.com/800/300' alt='' />
						<div className='title'>Iphone 11 -Black Colour, </div>
						<div className={`rating bad`}>
							3.5
							<GenericIcons name='star' />
						</div>
					</div>
					<div className='plusBox'>
						<GenericIcons name='plus' />
					</div>
					<div className='product'>
						<img src='https://placekitten.com/800/300' alt='' />
						<div className='title'>
							Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill
						</div>
						<div className={`rating average`}>
							3.5
							<GenericIcons name='star' />
						</div>
					</div>
					<div className='plusBox'>
						<GenericIcons name='plus' />
					</div>
					<div className='product'>
						<img src='https://placekitten.com/800/300' alt='' />
					</div>
				</div>
			</div>
			<div className='multipleProducts'>
				<div className='ldc-wishlistContainer'>
					<div className='ldc-infoContainer'>
						<div className='productsInfo'>Set of (5) Products</div>
						<div className='ldc'>
							Total LDC: <span> 201</span>
							<GenericIcons name='wallet' />
						</div>
					</div>
					<div className='wishlist'>
						<GenericIcons name={`wishlist-1`} />
					</div>
				</div>

				<div className='productsContainer'>
					<div className='product'>
						<img src='https://placekitten.com/800/300' alt='' />
						<div className='title'>
							Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill Iphone
							11 - 32 GB , Black Colour, Dual Camera with OG Bill
						</div>
						<div className={`rating good`}>
							3.5
							<GenericIcons name='star' />
						</div>
					</div>
					<div className='plusBox'>
						<GenericIcons name='plus' />
					</div>
					<div className='product'>
						<img src='https://placekitten.com/800/300' alt='' />
						<div className='title'>Iphone 11 -Black Colour, </div>
						<div className={`rating bad`}>
							3.5
							<GenericIcons name='star' />
						</div>
					</div>
					<div className='plusBox'>
						<GenericIcons name='plus' />
					</div>
					<div className='product'>
						<img src='https://placekitten.com/800/300' alt='' />
						<div className='title'>
							Iphone 11 - 32 GB , Black Colour, Dual Camera with OG Bill
						</div>
						<div className={`rating average`}>
							3.5
							<GenericIcons name='star' />
						</div>
					</div>
					<div className='plusBox'>
						<GenericIcons name='plus' />
					</div>
					<div className='product'>
						<img src='https://placekitten.com/800/300' alt='' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MultipleProducts;
