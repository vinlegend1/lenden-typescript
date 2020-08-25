import React from 'react';
import CommonForm, { ErrorContainer } from './../../common/commonForm';
import Joi from 'joi';
import { RootState } from '../../../app/models';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
Joi.extend(require('joi-phone-number'));

export interface EditDetailsProps extends RouteComponentProps {
	loading: boolean;
	error: string;
	name: string;
	handleDetailsChange: (d: { name: string; mobileNumber: string }) => void;
}

export interface EditDetailsState {
	data: {
		name: string;
		mobileNumber: string;
	};
	errors: ErrorContainer;
}

class EditDetails extends CommonForm<EditDetailsProps, EditDetailsState> {
	state = {
		loading: false,
		data: { name: this.props.name, mobileNumber: '' },
		errors: { name: '', mobileNumber: '' },
	};

	schema = {
		name: Joi.string().min(3).max(255).required().label('Name'),
		mobileNumber: Joi.string()
			.length(10)
			.pattern(/^[0-9]+$/)
			.error(() => 'first message')
			.required()
			.label('Mobile Number')
			.error((errors: any) => {
				errors.forEach((err: any) => {
					switch (err.code) {
						case 'string.pattern.base':
							err.message = '"Mobile Number" should be a valid Mobile Number';
							break;
					}
				});
				return errors;
			}),
	};
	doSubmit = () => {
		this.props.handleDetailsChange(this.state.data);
	};

	render() {
		return (
			<div className='container editDetailsContainer'>
				{this.renderInput('Full Name', 'name', this.state.errors.name)}
				{this.renderInput(
					'Mobile Number',
					'mobileNumber',
					this.state.errors.mobileNumber,
					'number'
				)}
				{this.renderLoader()}
				<div onClick={this.handleSubmit} id='saveBtn'>
					Save
				</div>
				<div
					onClick={() => this.props.history.push('/my-account')}
					id='cancelBtn'>
					Cancel
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const { name } = state.auth.user;

	return {
		name,
		loading: false, //TODO Fetch from auth.user
		error: '',
	};
};

export default connect(mapStateToProps)(withRouter(EditDetails));
