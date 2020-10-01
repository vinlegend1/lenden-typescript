import * as React from 'react';
import Navbar from '../../navbar';
import ProductPageForm from '../../../classes/productPage';
import mobileFormData from '../../../data/forms/mobileFormData';
import { RootState } from '../../../app/models';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import {
	getMobileProduct,
	resetMobilesProduct,
} from '../../../app/entities/productPage/mobiles/singleProductPage';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import PageLoader from '../../common/pageLoader';

interface MatchParams {
	id: string;
}

export interface SingleMobileProductPageProps
	extends ReduxProps,
		RouteComponentProps<MatchParams> {}

export interface SingleMobileProductPageState {}

const images = [
	'https://placekitten.com/1080/1500',
	'https://placekitten.com/1080/800',
	'https://placekitten.com/1920/1080',
];

// const { phoneDamaged, screenIssues, functionalIssues } = mobileFormData;

class SingleMobileProductPage extends ProductPageForm<
	SingleMobileProductPageProps,
	SingleMobileProductPageState
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
			brand,
			model,
			ldc,
			rating,
			description,
			mobileAge,
			workingCondition,
			phoneDamaged,
			screenIssues,
			functionalIssues,
			accessories,
		} = this.props.product;

		return (
			<div className='singleProductPage'>
				<Navbar />

				{this.renderBreadCrumb([
					{ title: 'Home', url: '/' },
					{
						title: 'Mobiles',
						url: '/products/mobiles',
					},
					{
						title: model,
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
									name: 'Screen Condition',
									value: workingCondition,
								},
								{
									name: 'Mobile Age',
									value: mobileAge,
								},
							],
						})}
						{this.renderProductAccordion([
							// {
							// 	type: 'yesNo',
							// 	header: 'Phone Body Condition',
							// 	data: {
							// 		givenOptions: phoneDamaged,
							// 		totalOptions: mobileFormData.phoneDamaged.options,
							// 	},
							// },
							{
								params: {
									true: { title: 'Yes' },
									false: { title: 'No' },
								},
								header: 'Mobile Screen Condition',
								data: {
									givenOptions: screenIssues,
									totalOptions: mobileFormData.screenIssues.options,
								},
							},
							{
								params: {
									true: { title: 'Yes' },
									false: { title: 'No' },
								},
								header: 'Functional / Physical issues',
								data: {
									givenOptions: functionalIssues,
									totalOptions: mobileFormData.functionalIssues.options,
								},
							},
							// {
							// 	type: 'yesNo',
							// 	header: 'Accessories available',
							// 	data: {
							// 		givenOptions: accessories,
							// 		totalOptions: mobileFormData.accessories.options.map(acc => {
							// 			if (acc.includes('Insurance')) return 'Insurance';
							// 			else return acc;
							// 		}),
							// 	},
							// },
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
	} = state.entities.productPage.mobiles.singleProductPage;
	return {
		loading,
		product,
		productFound,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	getProduct: (id: string) => dispatch(getMobileProduct(id)),
	clearProduct: () => dispatch(resetMobilesProduct()),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SingleMobileProductPage);
