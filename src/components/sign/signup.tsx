import React from 'react';
import CommonForm, { PassType, ErrorContainer } from './../common/commonForm';
import GenericNav from '../common/genericNav';
import Joi from 'joi';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../app/models';
import {
	signUpUser,
	updateError,
	updateSuccess,
	SignUpUserModel,
} from '../../app/auth/signup';

import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import GenericIcons from '../../icons/generic';
import { Modal, Button } from 'react-bootstrap';

Joi.extend(require('joi-phone-number'));
export interface SignupProps extends RouteComponentProps {
	loading: boolean;
	error: string;
	signUpUser: (data: SignUpUserModel) => Action;
	updateError: (error: string) => Action;
	updateSuccess: (error: string) => Action;
}

export interface SignupState {
	data: {
		name: string;
		email: string;
		password: string;
		mobileNumber: string;
	};
	errors: ErrorContainer;
	success: string;
	passType: {
		password: PassType;
	};
	termsConditions: boolean;
	showModal: boolean;
}

class Signup extends CommonForm<SignupProps, SignupState> {
	state = {
		data: {
			name: '',
			email: '',
			password: '',
			mobileNumber: '',
		},
		errors: {
			name: '',
			email: '',
			password: '',
			mobileNumber: '',
			termsConditions: '',
		},
		success: '',
		passType: { password: 'password' as PassType },
		termsConditions: false,
		showModal: false,
	};

	schema = {
		name: Joi.string().min(3).max(255).required().label('Name'),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label('Email'),
		password: Joi.string().min(6).max(255).required().label('Password'),
		mobileNumber: Joi.string()
			.length(10)
			.pattern(/^[0-9]+$/)
			.allow('')
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

	doSubmit = async () => {
		if (!this.state.termsConditions) {
			const errors = { ...this.state.errors };
			errors.termsConditions =
				'You must accept the terms and conditions to proceed';

			return this.setState({ errors });
		}
		const { data } = this.state;
		await this.props.signUpUser(data);

		if (!this.props.error) this.setState({ showModal: true });
	};

	render() {
		return (
			<React.Fragment>
				<GenericNav />
				<div className='mainSignContainer'>
					<div className='formBox'>
						<h1>Welcome to Len-Den,</h1>
						<h2>Please register with us to start your barter journey !</h2>

						{this.renderInput('Name *', 'name', this.state.errors.name)}
						{this.renderInput(
							'Mobile Number',
							'mobileNumber',
							this.state.errors.mobileNumber,
							'number'
						)}
						{this.renderInput('Email *', 'email', this.state.errors.email)}
						{this.renderInput(
							'Password *',
							'password',
							this.state.errors.password,
							'',
							'Password must be atleast 6 characters',
							undefined,
							true
						)}

						<div className='termsConditions'>
							<div className='pretty p-svg p-curve p-smooth'>
								<input
									type='checkbox'
									onChange={(e: React.ChangeEvent) => {
										const checked = (e.currentTarget as HTMLInputElement)
											.checked;
										this.setState({ termsConditions: checked });
									}}
									checked={this.state.termsConditions}
								/>
								<div className='state'>
									<GenericIcons className='svg' name='tick' />

									<label>
										I accept the Terms & conditions of Len Den India.
									</label>
								</div>
							</div>
							<small
								className={`${
									this.state.errors.termsConditions ? 'active' : ''
								}`}>
								{this.state.errors.termsConditions}
							</small>
						</div>

						{this.renderLoader(this.props.loading)}
						{this.renderErrorAlert()}
						{this.renderSuccessAlert()}

						<div onClick={this.handleSubmit} className='darkButton'>
							Continue
						</div>
						<div className='separator'>or</div>
						<div
							onClick={() => this.props.history.push('/login')}
							className='lightButton'>
							Login
						</div>
					</div>
				</div>
				<Modal
					className='notificationMessage'
					size='lg'
					centered
					show={this.state.showModal}
					backdrop='static'
					keyboard={false}>
					<Modal.Body>
						<GenericIcons name='success' />
						Your account has been created successfully. Kindly verify it using
						the verification mail sent in your mailbox before logging in.
						<div
							onClick={() => this.props.history.push('/login')}
							className='darkButton'>
							Login
						</div>
					</Modal.Body>
				</Modal>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const { error, success, loading } = state.auth.signup;
	return {
		error,
		success,
		loading,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	signUpUser: (data: SignUpUserModel) => dispatch(signUpUser(data)),
	updateError: (error: string) => dispatch(updateError(error)),
	updateSuccess: (message: string) => dispatch(updateSuccess(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
