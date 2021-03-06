import * as React from 'react';
import SingleProductBox from './singleProductBox';
import { useDispatch, useSelector } from 'react-redux';
import {
	getProducts,
	resetProductList,
} from '../../../app/entities/products/singleProducts';
import { ClipLoader } from 'react-spinners';
import { RootState } from '../../../app/models';
import InfiniteScroll from 'react-infinite-scroll-component';

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
		dispatch(getProducts(props.category));
		return () => {
			dispatch(resetProductList());
		};
	}, [props.category]);

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

			{list.length !== 0 && (
				<InfiniteScroll
					dataLength={list.length} //This is important field to render the next data
					next={() => dispatch(getProducts(props.category))}
					hasMore={showButton}
					loader={<p>Wait</p>}
					endMessage={
						!loading && (
							<div
								style={{
									fontFamily: 'Cera Pro',
									textAlign: 'center',
									margin: '1rem 0',
								}}>
								<p>Yay! You have seen it all</p>
							</div>
						)
					}>
					{list.length !== 0 &&
						list.map((product, index) => (
							<SingleProductBox productInfo={product} key={index} />
						))}
					<div style={{ textAlign: 'center' }}>
						<ClipLoader
							size={35}
							color={'#1a2639'}
							loading={loading}
							css='display:block;margin:2vh auto'
						/>
					</div>
				</InfiniteScroll>
			)}
		</div>
	);
};

export default SingleProducts;
