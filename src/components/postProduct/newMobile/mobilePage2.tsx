import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import mobileFormData from '../../../data/forms/mobileFormData';
import PostProductForm, {
	PostProductFormState,
} from './../../../classes/postProductForm';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../app/models';
import { Dispatch, ThunkDispatch, Action } from '@reduxjs/toolkit';
import Joi from 'joi';
import {
	MobileFormSlicePage2,
	postMobileForm,
	updateMobileFormPage2Details,
} from './../../../app/entities/postProduct/mobileForm';
import { Form } from 'react-bootstrap';

export interface MobilePage2Props extends RouteComponentProps, ReduxProps {}

export interface MobilePage2State extends PostProductFormState {
	data: MobileFormSlicePage2;
}

const accessoriesOptions = mobileFormData.accessories.options;
const accessoriesOptionsLength = accessoriesOptions.length;
const accessoriesLastOption = accessoriesOptions[accessoriesOptionsLength - 1];

class MobilePage2 extends PostProductForm<MobilePage2Props, MobilePage2State> {
	state = {
		data: {
			functionalIssues: [...this.props.data.functionalIssues],
			accessories: [...this.props.data.accessories],
			mobileAge: this.props.data.mobileAge,
			insurance: this.props.data.insurance,
		},
		errors: {
			functionalIssues: '',
			accessories: '',
			mobileAge: '',
			insurance: '',
		},
		images: {},
	};
	schema = {
		functionalIssues: Joi.array().min(0).label('Functional Issues'),
		accessories: Joi.array().min(0).label('Accessories'),
		mobileAge: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		insurance: Joi.number()
			.min(1)
			.max(12)
			.required()
			.error((errors: any) => {
				if (!this.state.data.accessories.includes(accessoriesLastOption))
					return [];
				else return errors;
			})
			.label('Insurance'),
	};

	insuranceInputRef = React.createRef<HTMLInputElement>();

	doSubmit = () => {
		this.props.updatePage2Details(this.state.data);
		this.props.postMobileForm();
	};
	render() {
		if (!this.props.data.workingCondition)
			this.props.history.replace('/post-product/mobile/1');
		return (
			<div className='postProduct newBook'>
				<div className='container mainContainer'>
					{this.renderCheckBoxInput(
						mobileFormData.functionalIssues.name,
						'functionalIssues',
						...mobileFormData.functionalIssues.options
					)}

					<Form.Group className='checkBoxInput'>
						<Form.Label>{mobileFormData.accessories.name}</Form.Label>
						<div className='checkBoxGroup'>
							{accessoriesOptions
								.filter(o => o !== accessoriesLastOption)
								.map((option, index) => (
									<label
										key={index}
										className='checkbox'
										onClick={e => {
											e.preventDefault();

											let accessories = [...this.state.data.accessories];

											if (accessories.includes(option)) {
												accessories = accessories.filter(
													(c: string) => c !== option
												);
											} else accessories.push(option);

											this.setState({
												data: {
													...this.state.data,
													accessories,
												},
											});
										}}>
										<input
											type='checkbox'
											checked={
												this.state.data.accessories.includes(option)
													? true
													: false
											}
											readOnly
										/>
										<div>
											<span className='check'></span>
										</div>
										<span
											className={
												this.state.data.accessories.includes(option)
													? 'active'
													: ''
											}>
											{option}
										</span>
									</label>
								))}
							<label
								key={accessoriesOptionsLength}
								className='checkbox'
								onClick={e => {
									e.preventDefault();
									let accessories = [...this.state.data.accessories];
									if (accessories.includes(accessoriesLastOption)) {
										accessories = accessories.filter(
											(c: string) => c !== accessoriesLastOption
										);
										this.setState({
											data: {
												...this.state.data,
												insurance: 0,
												accessories,
											},
										});
									} else {
										accessories.push(accessoriesLastOption);
										this.insuranceInputRef.current?.focus();
										this.setState({
											data: {
												...this.state.data,
												accessories,
											},
										});
									}
								}}>
								<input
									type='checkbox'
									checked={
										this.state.data.accessories.includes(accessoriesLastOption)
											? true
											: false
									}
									readOnly
								/>
								<div>
									<span className='check'></span>
								</div>
								<span
									className={
										this.state.data.accessories.includes(accessoriesLastOption)
											? 'active'
											: ''
									}>
									{accessoriesLastOption}
									<div>
										<Form.Control
											id='insurance'
											ref={this.insuranceInputRef}
											className='timesInput'
											type='number'
											value={
												this.state.data.accessories.includes(
													accessoriesLastOption
												) && this.state.data.insurance !== 0
													? this.state.data.insurance
													: ''
											}
											onClick={(e: any) => {
												e.stopPropagation();

												let accessories = [...this.state.data.accessories];
												if (!accessories.includes(accessoriesLastOption)) {
													accessories.push(accessoriesLastOption);
													this.setState({
														data: {
															...this.state.data,
															accessories,
														},
													});
												}
											}}
											onChange={(e: React.ChangeEvent) => {
												const data = { ...this.state.data };
												data.insurance =
													parseInt(
														(e.currentTarget as HTMLInputElement).value.toString()
													) || 0;
												this.setState({ data });
											}}
											onKeyPress={(event: React.KeyboardEvent) => {
												if (event.key === 'Enter')
													this.insuranceInputRef.current?.blur();
											}}
										/>
									</div>
								</span>
							</label>
						</div>
						<Form.Text
							className={
								this.state.errors.accessories || this.state.errors.insurance
									? 'active'
									: ''
							}
							style={{ marginLeft: '1rem' }}>
							{this.state.errors.accessories || this.state.errors.insurance}
						</Form.Text>
					</Form.Group>

					{this.renderRadioInput(
						mobileFormData.mobileAge.name,
						'mobileAge',
						...mobileFormData.mobileAge.options
					)}

					{this.renderImageInput({
						label:
							'We are thrilled to see your Mobile Phone. Please attach the images of your Mobile Phone here',
						note: 'Upload all the pictures according to the specified angles',
						imagesRequired: [
							{ name: 'frontSide', label: 'Front' },
							{ name: 'backSide', label: 'Back' },
							{ name: 'Side1', label: 'First Side' },
							{ name: 'Side2', label: 'Second Side' },
							{ name: 'aboutPhone', label: 'Phone info in Phone' },
							{ name: 'box', label: 'Box' },
						],
					})}

					{this.renderLoader(this.props.loading)}
					{this.renderErrorAlert()}
					{this.renderProgressBar(2, 2)}
					<div className='darkButton' onClick={this.handleSubmit}>
						Post Now
					</div>
				</div>
				{this.renderSuccessModal(2)}
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
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	updatePage2Details: (data: MobileFormSlicePage2) =>
		dispatch(updateMobileFormPage2Details(data)),
	postMobileForm: () => dispatch(postMobileForm()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(MobilePage2);
