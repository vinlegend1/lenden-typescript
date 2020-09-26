import * as React from 'react';
import SingleProductBox from './singleProductBox';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProducts,
	resetProductList,
} from '../../../app/entities/products/singleProducts';
import { ClipLoader, BarLoader } from 'react-spinners';
import { RootState } from '../../../app/models';

export interface SingleProductsProps {
	category?: string;
}

const SingleProducts: React.FC<SingleProductsProps> = props => {
	const dispatch = useDispatch();
	const {
		list,
		showButton,
		loading,
		loadingPage,
		productsReceived,
	} = useSelector((state: RootState) => state.entities.products.singleProducts);

	React.useEffect(() => {
		// if (page === 0)
		dispatch(getProducts(props.category));
		// else dispatch(changeButtonStatus(true));
		return () => {
			dispatch(resetProductList());
		};
	}, []);

	if (loadingPage)
		return (
			<div style={{ textAlign: 'center', marginTop: '3rem' }}>
				<ClipLoader size={35} color={'#1a2639'} loading={true} />
			</div>
		);

	return (
		<div className='singleProductsContainer'>
			{productsReceived && list.length === 0 && (
				<div
					style={{
						fontFamily: 'Cera Pro',
						textAlign: 'center',
						marginTop: '3rem',
					}}>
					There are no products to show!
				</div>
			)}
			{list.length !== 0 &&
				list.map((product, index) => (
					<SingleProductBox productInfo={product} key={index} />
				))}

			<div style={{ textAlign: 'center' }}>
				<BarLoader
					height={3}
					css='display:block;margin:2vh auto'
					color={'#1a2639'}
					loading={loading}
				/>
			</div>

			{list.length !== 0 && showButton && (
				<div
					className='darkButton'
					style={{
						fontFamily: 'Cera Pro',
						margin: '1rem auto',
						width: '10rem',
						padding: 0,
						height: '2.2rem',
					}}
					onClick={() => dispatch(getProducts(props.category))}>
					Load More
				</div>
			)}
		</div>
	);
};

export default SingleProducts;
