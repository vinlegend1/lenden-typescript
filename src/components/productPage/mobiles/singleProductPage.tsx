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
import ProductAccordion from '../../common/productPage/productAccordion';

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

	renderProductAccordion = (
		cards: Array<{
			header: string;
			data: {
				givenOptions: string;
				totalOptions: string[];
			};
			params: {
				true: { title: string; color?: 'red' | 'green' };
				false: { title: string; color?: 'red' | 'green' };
			};
		}>
	) => {
		let accordionProps: Array<{
			header: string;
			body: JSX.Element;
		}> = [];

		cards.forEach(card => {
			if (card.header.match(/.*accessories.*/i)) {
				const givenOptions = card.data.givenOptions.split(', ');
				let insuranceLeft;
				givenOptions.forEach(option => {
					if (option.match(/insurance/i)) {
						insuranceLeft = option
							.split('insurance ')[1]
							.replace(/[{()}]/g, '');
					}
				});

				const body = (
					<React.Fragment>
						{card.data.totalOptions
							.filter(op => !op.match(/.*insurance.*/i))
							.map((option, i) => {
								const isPresent = card.data.givenOptions.includes(option);
								return (
									<div className='cardDetails' key={i}>
										<div className='name'>{option}</div>
										<div
											className={`value ${
												card.params.true.color &&
												card.params.false.color &&
												isPresent
													? card.params.true.color
													: card.params.false.color
											}`}>
											{isPresent
												? card.params.true.title
												: card.params.false.title}
										</div>
									</div>
								);
							})}
						<div className='cardDetails'>
							<div className='name'>Insurance</div>
							<div className={`value ${insuranceLeft ? 'green' : 'red'}`}>
								{insuranceLeft ? `yes, ${insuranceLeft}` : 'Not Available'}
							</div>
						</div>
					</React.Fragment>
				);
				accordionProps.push({ body, header: card.header });
			} else {
				const body = (
					<React.Fragment>
						{card.data.totalOptions.map((option, i) => {
							const isPresent = card.data.givenOptions.includes(option);
							return (
								<div className='cardDetails' key={i}>
									<div className='name'>{option}</div>
									<div
										className={`value ${
											card.params.true.color &&
											card.params.false.color &&
											isPresent
												? card.params.true.color
												: card.params.false.color
										}`}>
										{isPresent
											? card.params.true.title
											: card.params.false.title}
									</div>
								</div>
							);
						})}
					</React.Fragment>
				);
				accordionProps.push({ body, header: card.header });
			}
		});

		return <ProductAccordion cards={accordionProps} />;
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
									true: { title: 'Yes', color: 'red' },
									false: { title: 'No', color: 'green' },
								},
								header: 'Mobile Screen Condition',
								data: {
									givenOptions: screenIssues,
									totalOptions: mobileFormData.screenIssues.options,
								},
							},
							{
								params: {
									true: { title: 'Not Working', color: 'red' },
									false: { title: 'Working', color: 'green' },
								},
								header: 'Functional / Physical issues',
								data: {
									givenOptions: functionalIssues,
									totalOptions: mobileFormData.functionalIssues.options,
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
									totalOptions: mobileFormData.accessories.options,
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
