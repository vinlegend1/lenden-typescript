import * as React from 'react';
import PostProductForm, {
	PostProductFormState,
} from '../../../classes/postProductForm';
import Joi from 'joi';
import { RouteComponentProps } from 'react-router-dom';
import SubNav from '../../common/subNav';
import gamingCdForm from '../../../data/forms/gamingCdFormData';
import { RootState } from '../../../app/models';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import {
	GamingCdFormSliceState,
	updateGamingCdFormDetails,
	postGamingCdForm,
	clearGamingCdForm,
} from './../../../app/entities/postProduct/gamingCdForm';
import { connect, ConnectedProps } from 'react-redux';

export interface NewGamingCdProps extends RouteComponentProps, ReduxProps {}

export interface NewGamingCdState extends PostProductFormState {
	data: GamingCdFormSliceState;
}

class NewGamingCd extends PostProductForm<NewGamingCdProps, NewGamingCdState> {
	state = {
		data: {
			title: this.props.data.title,
			deviceCompatible: this.props.data.deviceCompatible,
			description: this.props.data.description,
			originalCase: this.props.data.originalCase,
			scratches: this.props.data.scratches,
		},
		errors: {
			title: '',
			deviceCompatible: '',
			description: '',
			originalCase: '',
			scratches: '',
		},
		images: {},
	};
	componentWillUnmount() {
		this.props.clearForm();
	}

	schema = {
		title: Joi.string().required().label('Title'),
		deviceCompatible: Joi.string().required().label('Compatible Device'),
		description: Joi.string().required().label('Description'),
		originalCase: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
		scratches: Joi.string()
			.required()
			.error((errors: any) => {
				errors.forEach((err: any) => {
					if (err.code === 'string.empty')
						err.message = 'This question is required';
				});
				return errors;
			}),
	};
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
							<h3>Gaming CD's</h3>
							<p onClick={() => this.props.history.goBack()}> Change</p>
						</div>
					</div>
					<div className='container mainContainer'>
						<p>
							Note:
							<span>
								Please fill this form ONLY IF you have a Gaming CD that is in a
								condition to be used by a new user.
							</span>
						</p>

						{this.renderInput(
							gamingCdForm.title.name,
							'title',
							this.state.errors.title
						)}
						{this.renderInput(
							gamingCdForm.deviceCompatible.name,
							'deviceCompatible',
							this.state.errors.deviceCompatible
						)}
						{this.renderTextArea(
							gamingCdForm.description.name,
							'description',
							this.state.errors.description
						)}

						{this.renderRadioInput(
							gamingCdForm.originalCase.name,
							'originalCase',
							...gamingCdForm.originalCase.options
						)}
						{this.renderRadioInput(
							gamingCdForm.scratches.name,
							'scratches',
							...gamingCdForm.scratches.options
						)}
						{this.renderImageInput({
							label:
								'We are thrilled to see your Mobile Phone. Please attach the images of your Mobile Phone here',
							note: 'Upload all the pictures according to the specified angles',
							imagesRequired: [
								{ name: 'coverFront', label: 'CD Cover Front' },
								{ name: 'coverBack', label: 'CD Cover Back' },
								{ name: 'cdFront', label: 'CD Front' },
								{ name: 'cdBack', label: 'CD Front' },
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
	const { data, loading, error } = state.entities.postProduct.gamingCdForm;
	return {
		data,
		loading,
		error,
	};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	updateDetails: (data: GamingCdFormSliceState) =>
		dispatch(updateGamingCdFormDetails(data)),
	postForm: () => dispatch(postGamingCdForm()),
	clearForm: () => dispatch(clearGamingCdForm()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NewGamingCd);
