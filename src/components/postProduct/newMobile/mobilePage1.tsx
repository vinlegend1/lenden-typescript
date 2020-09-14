import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import mobileFormData from '../../../data/forms/mobileFormData';
import PostProductForm, {
	PostProductFormState,
} from './../../../classes/postProductForm';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../app/models';
import { Dispatch } from '@reduxjs/toolkit';
import Joi from 'joi';
import {
	MobileFormSlicePage1,
	updateMobileFormPage1Details,
} from './../../../app/entities/postProduct/mobileForm';
import { animateScroll as scroll } from 'react-scroll';

export interface MobilePage1Props extends RouteComponentProps, ReduxProps {}

export interface MobilePage1State extends PostProductFormState {
	data: MobileFormSlicePage1;
}

class MobilePage1 extends PostProductForm<MobilePage1Props, MobilePage1State> {
	state = {
		data: {
			brand: this.props.data.brand,
			otherBrandName: this.props.data.otherBrandName,
			model: this.props.data.model,
			workingCondition: this.props.data.workingCondition,
			phoneDamaged: [...this.props.data.phoneDamaged],
			screenIssues: [...this.props.data.screenIssues],
		},
		errors: {
			model: '',
			brand: '',
			otherBrandName: '',
			workingCondition: '',
			phoneDamaged: '',
			screenIssues: '',
		},
	};
	schema = {
		brand: Joi.string().required().label('Brand'),
		otherBrandName: Joi.string()
			.required()
			.label('Brand')
			.error((errors: any) => {
				if (this.state.data.brand !== 'Others') return [];
				else return errors;
			}),
		model: Joi.string().required().label('Model'),
		workingCondition: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		phoneDamaged: Joi.array().min(0).label('Phone Damages'),
		screenIssues: Joi.array().min(0).label('Screen Issues'),
	};

	modelRef = React.createRef<HTMLSelectElement>();

	doSubmit = () => {
		this.props.updatePage1Details(this.state.data);
		this.props.history.push('/post-product/mobile/2');
		scroll.scrollToTop({
			duration: 200,
			smooth: 'linear',
		});
	};
	render() {
		return (
			<div className='postProduct newBook'>
				<div className='container selectedChoice'>
					<h2>Selected Category</h2>
					<div>
						<h3>Mobile Phones</h3>
						<p onClick={() => this.props.history.goBack()}> Change</p>
					</div>
				</div>
				<div className='container mainContainer'>
					{/* <p>
						Note:
						<span>
							Please fill this form ONLY IF you have a book that is in a
							condition to be used by a new reader.
						</span>
					</p> */}

					{this.renderDropdownInput(
						mobileFormData.brand.name,
						'brand',
						null,
						() => {
							const data = { ...this.state.data };
							if (
								mobileFormData.brand.options.includes(
									this.state.data.brand.toString()
								)
							) {
								if (this.state.data.brand !== 'Others') {
									data.model = this.modelRef.current!.value;
								} else {
									data.model = '';
								}
								this.setState({ data });
							}
						},
						...mobileFormData.brand.options
					)}

					{mobileFormData.brand.options.includes(this.state.data.brand) &&
						this.state.data.brand === 'Others' &&
						this.renderInput(
							'Please enter the brand name',
							'otherBrandName',
							this.state.errors.otherBrandName
						)}

					{mobileFormData.brand.options.includes(this.state.data.brand) &&
						this.state.data.brand !== 'Others' &&
						this.renderDropdownInput(
							mobileFormData.model.name,
							'model',
							this.modelRef,
							undefined,
							...mobileFormData.model.options[this.state.data.brand]
						)}
					{mobileFormData.brand.options.includes(this.state.data.brand) &&
						this.state.data.brand === 'Others' &&
						this.renderInput(
							mobileFormData.model.name,
							'model',
							this.state.errors.model
						)}

					{this.renderRadioInput(
						mobileFormData.workingCondition.name,
						'workingCondition',
						...mobileFormData.workingCondition.options
					)}
					{this.renderCheckBoxInput(
						mobileFormData.phoneDamaged.name,
						'phoneDamaged',
						...mobileFormData.phoneDamaged.options
					)}
					{this.renderCheckBoxInput(
						mobileFormData.screenIssues.name,
						'screenIssues',
						...mobileFormData.screenIssues.options
					)}

					{this.renderProgressBar(1, 2)}
					<div className='darkButton' onClick={this.handleSubmit}>
						Next
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const { data, loading, error } = state.entities.postProduct.mobileForm;
	return {
		data,
		loading,
		error,
	};
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
	updatePage1Details: (data: MobileFormSlicePage1) =>
		dispatch(updateMobileFormPage1Details({ ...data })),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(MobilePage1);
