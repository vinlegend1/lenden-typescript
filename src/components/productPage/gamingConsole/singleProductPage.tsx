import * as React from 'react';
import Navbar from '../../navbar';
import ProductPageForm from '../../../classes/productPage';
import { RootState } from '../../../app/models';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import PageLoader from '../../common/pageLoader';
import {
	getGamingConsoleProduct,
	resetGamingConsoleProduct,
} from './../../../app/entities/productPage/gamingConsoles/singleProductPage';
import gamingConsolesData from '../../../data/forms/gamingConsolesData';

interface MatchParams {
	id: string;
}

export interface SingleGamingConsoleProductPageProps
	extends ReduxProps,
		RouteComponentProps<MatchParams> {}

export interface SingleGamingConsoleProductPageState {}

const images = [
	'https://placekitten.com/1080/1500',
	'https://placekitten.com/1080/800',
	'https://placekitten.com/1920/1080',
];

class SingleGamingConsoleProductPage extends ProductPageForm<
	SingleGamingConsoleProductPageProps,
	SingleGamingConsoleProductPageState
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
			accessories,
			brand,
			condition,
			consoleAge,
			functionalIssues,
			model,
			workingCondition,
		} = this.props.product;

		return (
			<div className='singleProductPage'>
				<Navbar />

				{this.renderBreadCrumb([
					{ title: 'Home', url: '/' },
					{
						title: 'Gaming Console',
						url: '/products/gaming-consoles',
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
									name: 'Brand',
									value: brand,
								},
								{
									name: 'Model',
									value: model,
								},
								{
									name: 'Console Condition',
									value: workingCondition,
								},
								{
									name: 'Overall Condition',
									value: condition,
								},
								{
									name: 'Age',
									value: consoleAge,
								},
							],
						})}

						{this.renderProductAccordion([
							{
								params: {
									true: { title: 'Not Working', color: 'red' },
									false: { title: 'Working', color: 'green' },
								},
								header: 'Functional conditions',
								data: {
									givenOptions: functionalIssues,
									totalOptions: gamingConsolesData.functionalIssues.options,
								},
							},
							{
								params: {
									true: { title: 'Available', color: 'green' },
									false: { title: 'Not Available', color: 'red' },
								},
								header: 'Accessories Available',
								data: {
									givenOptions: accessories,
									totalOptions: gamingConsolesData.accessories.options,
								},
							},
						])}
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
	} = state.entities.productPage.gamingConsoles.singleProductPage;
	return {
		loading,
		product,
		productFound,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	getProduct: (id: string) => dispatch(getGamingConsoleProduct(id)),
	clearProduct: () => dispatch(resetGamingConsoleProduct()),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SingleGamingConsoleProductPage);
