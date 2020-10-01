import * as React from 'react';
import Navbar from '../../navbar';
import ProductPageForm from '../../../classes/productPage';
import { RootState } from '../../../app/models';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import PageLoader from '../../common/pageLoader';
import {
	getBookProduct,
	resetBookProduct,
} from './../../../app/entities/productPage/books/singleProductPage';
import ProductAccordion from '../../common/productPage/productAccordion';

interface MatchParams {
	id: string;
}

export interface SingleBookProductPageProps
	extends ReduxProps,
		RouteComponentProps<MatchParams> {}

export interface SingleBookProductPageState {}

const images = [
	'https://placekitten.com/1080/1500',
	'https://placekitten.com/1080/800',
	'https://placekitten.com/1920/1080',
];

class SingleBookProductPage extends ProductPageForm<
	SingleBookProductPageProps,
	SingleBookProductPageState
> {
	componentDidMount = () => {
		this.props.getProduct(this.props.match.params.id);
	};

	componentWillUnmount = () => {
		this.props.clearProduct();
	};

	render() {
		const {
			title,
			description,
			ldc,
			rating,
			isWishlist,
			isDisabled,
			bindingType,
			inkStains,
			bookFoxed,
			bindingCondition,
			coverCondition,
			bookRepaired,
		} = this.props.product;

		return (
			<div className='singleProductPage'>
				<Navbar />

				{this.renderBreadCrumb([
					{ title: 'Home', url: '/' },
					{
						title: 'Books',
						url: '/products/books',
					},
					{
						title: `${title.substring(0, 20)}...`,
					},
				])}

				{this.props.loading ? (
					<PageLoader />
				) : !this.props.productFound ? (
					<Redirect to='/not-found' />
				) : (
					<React.Fragment>
						{this.renderProductCarousel({
							images,
							shareUrl: window.location.href,
							shareTitle: title,
						})}

						{this.renderProductAction(false)}

						{this.renderAboutProduct({
							name: title,
							ldc: ldc,
							rating: rating,
						})}
						{this.renderProductDetails({
							description,
							details:
								bookRepaired === 0
									? [
											{
												name: 'Binding Type',
												value: bindingType,
											},
									  ]
									: [
											{
												name: 'Binding Type',
												value: bindingType,
											},
											{
												name: 'If repaired earlier',
												value: `${bookRepaired} times`,
											},
									  ],
						})}
						<ProductAccordion
							cards={[
								{
									header: 'Inner Condition',
									body: (
										<div>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}>
												<div style={{ color: '#b4b4b4' }}>Ink Stains</div>
												<div>{inkStains}</div>
											</div>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}>
												<div style={{ color: '#b4b4b4' }}>
													Spots and Browning
												</div>
												<div>{bookFoxed}</div>
											</div>
										</div>
									),
								},
								{
									header: 'Outer Condition',
									body: (
										<div>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}>
												<div style={{ color: '#b4b4b4' }}>
													Binding Condition
												</div>
												<div>{bindingCondition}</div>
											</div>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
												}}>
												<div style={{ flexBasis: '60%', color: '#b4b4b4' }}>
													Front and Back Sides
												</div>
												<div style={{ textAlign: 'right' }}>
													{coverCondition}
												</div>
											</div>
										</div>
									),
								},
							]}
						/>
					</React.Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const {
		loading,
		product,
		productFound,
	} = state.entities.productPage.books.singleProductPage;
	return {
		loading,
		product,
		productFound,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	getProduct: (id: string) => dispatch(getBookProduct(id)),
	clearProduct: () => dispatch(resetBookProduct()),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SingleBookProductPage);
