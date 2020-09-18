import * as React from 'react';
import SingleProductBox from '../common/singleProductBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/models';
import {
	changeButtonStatus,
	getProducts,
} from '../../app/entities/singleProducts';
import { ClipLoader, BarLoader } from 'react-spinners';

export interface SingleProductsProps {}

const SingleProducts: React.FC<SingleProductsProps> = () => {
	const dispatch = useDispatch();
	const { list, showButton, loading, loadingPage, page } = useSelector(
		(state: RootState) => state.entities.singleProducts
	);

	React.useState(() => {
		if (page === 0) dispatch(getProducts(''));
		else dispatch(changeButtonStatus(true));
	});

	if (loadingPage)
		return (
			<div style={{ textAlign: 'center', marginTop: '3rem' }}>
				<ClipLoader size={35} color={'#1a2639'} loading={true} />
			</div>
		);

	return (
		<div className='singleProductsContainer'>
			{list.length === 0 && (
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
					onClick={() => dispatch(getProducts(''))}>
					Load More
				</div>
			)}
		</div>
	);
};

export default SingleProducts;
