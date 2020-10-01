import * as React from 'react';
import Navbar from '../../navbar';
import ProductPageForm from '../../../classes/productPage';
import { RootState } from '../../../app/models';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import PageLoader from '../../common/pageLoader';
import {
	getGamingCdProduct,
	resetGamingCdProduct,
} from './../../../app/entities/productPage/gamingCd/singleProductPage';

interface MatchParams {
	id: string;
}

export interface SingleGamingCdProductPageProps
	extends ReduxProps,
		RouteComponentProps<MatchParams> {}

export interface SingleGamingCdProductPageState {}

const images = [
	'https://placekitten.com/1080/1500',
	'https://placekitten.com/1080/800',
	'https://placekitten.com/1920/1080',
];

class SingleGamingCdProductPage extends ProductPageForm<
	SingleGamingCdProductPageProps,
	SingleGamingCdProductPageState
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
			deviceCompatible,
			originalCase,
			scratches,
		} = this.props.product;

		return (
			<div className='singleProductPage'>
				<Navbar />

				{this.renderBreadCrumb([
					{ title: 'Home', url: '/' },
					{
						title: 'Gaming Cd',
						url: '/products/gaming-cd',
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
							details: [
								{
									name: 'Compatible Platform',
									value: deviceCompatible,
								},
								{
									name: 'Original Case',
									value: originalCase,
								},
								{
									name: 'Scratches',
									value: scratches,
								},
							],
						})}
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
	} = state.entities.productPage.gamingCd.singleProductPage;
	return {
		loading,
		product,
		productFound,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	getProduct: (id: string) => dispatch(getGamingCdProduct(id)),
	clearProduct: () => dispatch(resetGamingCdProduct()),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SingleGamingCdProductPage);
