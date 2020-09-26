import * as React from 'react';
import PostProductForm, {
	PostProductFormState,
} from '../../../classes/postProductForm';
import Joi from 'joi';
import { RouteComponentProps } from 'react-router-dom';
import SubNav from '../../common/subNav';
import gamingConsolesData from '../../../data/forms/gamingConsolesData';
import { RootState } from '../../../app/models';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import {
	clearGamingConsoleForm,
	GamingConsoleFormSliceState,
	updateGamingConsoleFormDetails,
	postGamingConsoleForm,
} from './../../../app/entities/postProduct/gamingConsoleForm';

export interface NewGamingConsoleProps
	extends RouteComponentProps,
		ReduxProps {}

export interface NewGamingConsoleState extends PostProductFormState {
	data: GamingConsoleFormSliceState;
}

class NewGamingConsole extends PostProductForm<
	NewGamingConsoleProps,
	NewGamingConsoleState
> {
	state = {
		data: {
			brand: this.props.data.brand,
			model: this.props.data.model,
			description: this.props.data.description,
			workingCondition: this.props.data.workingCondition,
			condition: this.props.data.condition,
			functionalIssues: [...this.props.data.functionalIssues],
			accessories: [...this.props.data.accessories],
			consoleAge: this.props.data.consoleAge,
		},
		errors: {
			brand: '',
			model: '',
			description: '',
			workingCondition: '',
			condition: '',
			functionalIssues: '',
			accessories: '',
			consoleAge: '',
		},
		images: {},
	};
	modelRef = React.createRef<HTMLSelectElement>();

	schema = {
		brand: Joi.string()
			.required()
			.label('Brand')
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.base') err.message = '"Brand" is required';
				});
				return errors;
			}),
		model: Joi.string().required().label('Model'),
		description: Joi.string().required().label('Description'),
		workingCondition: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		condition: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		functionalIssues: Joi.array().min(0).label('Functional Issues'),
		accessories: Joi.array().min(0).label('Accessories'),
		consoleAge: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
	};

	componentWillUnmount() {
		this.props.clearForm();
	}

	doSubmit = () => {
		this.props.updateDetails(this.state.data);
		this.props.postForm();
	};
	render() {
		return (
			<React.Fragment>
				<SubNav title='Post your product' />
				<div className='postProduct'>
					<div className='container selectedChoice'>
						<h2>Selected Category</h2>
						<div>
							<h3>Gaming Consoles</h3>
							<p onClick={() => this.props.history.goBack()}> Change</p>
						</div>
					</div>
					<div className='container mainContainer'>
						<p>
							Note:
							<span>
								Please fill this form ONLY IF you have a Gaming Console that is
								in a condition to be used by a new user.
							</span>
						</p>

						{this.renderRadioInputWithOthers(
							gamingConsolesData.brand.name,
							'brand',
							() => {
								const data = { ...this.state.data };
								if (
									gamingConsolesData.brand.options.includes(
										this.state.data.brand.toString()
									)
								)
									data.model = this.modelRef.current!.value;
								else data.model = '';
								this.setState({ data });
							},
							...gamingConsolesData.brand.options
						)}

						{!gamingConsolesData.brand.options.includes(
							this.state.data.brand.toString()
						) &&
							this.renderInput(
								gamingConsolesData.model.name,
								'model',
								this.state.errors.model
							)}

						{gamingConsolesData.brand.options.includes(
							this.state.data.brand.toString()
						) &&
							this.renderDropdownInput(
								gamingConsolesData.model.name,
								'model',
								this.modelRef,
								undefined,
								...gamingConsolesData.model.options[this.state.data.brand]
							)}
						{this.renderTextArea(
							gamingConsolesData.description.name,
							'description',
							this.state.errors.description
						)}

						{this.renderRadioInput(
							gamingConsolesData.workingCondition.name,
							'workingCondition',
							...gamingConsolesData.workingCondition.options
						)}

						{this.renderCheckBoxInput(
							gamingConsolesData.functionalIssues.name,
							'functionalIssues',
							...gamingConsolesData.functionalIssues.options
						)}

						{this.renderCheckBoxInput(
							gamingConsolesData.accessories.name,
							'accessories',
							...gamingConsolesData.accessories.options
						)}

						{this.renderRadioInput(
							gamingConsolesData.condition.name,
							'condition',
							...gamingConsolesData.condition.options
						)}
						{this.renderRadioInput(
							gamingConsolesData.consoleAge.name,
							'consoleAge',
							...gamingConsolesData.consoleAge.options
						)}

						{this.renderImageInput({
							label:
								'We are thrilled to see your Console. Please attach the images of your console here',
							note: 'Upload all the pictures according to the specified angles',
							imagesRequired: [
								{ name: 'frontSide', label: 'Front' },
								{ name: 'backSide', label: 'Backside' },
								{ name: 'accessories', label: 'With all accessories' },
								{ name: 'consoleON', label: 'Console turned ON' },
							],
						})}

						{this.renderErrorAlert()}
						{this.renderLoader(this.props.loading)}
						{this.renderProgressBar(1, 1)}
						<div className='darkButton' onClick={this.handleSubmit}>
							Post Now
						</div>
					</div>
					{this.renderSuccessModal(1)}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const {
		data,
		loading,
		error,
		success,
	} = state.entities.postProduct.gamingConsoleForm;
	return {
		data,
		loading,
		error,
		success,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	updateDetails: (data: GamingConsoleFormSliceState) =>
		dispatch(updateGamingConsoleFormDetails(data)),
	postForm: () => dispatch(postGamingConsoleForm()),
	clearForm: () => dispatch(clearGamingConsoleForm()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NewGamingConsole);
