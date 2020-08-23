import React from 'react';
import CommonForm, { PassType, ErrorContainer } from './../common/commonForm';
import SignNav from './signNav';
import Joi from 'joi';
import { getCurrentUser } from './../../services/authService';
import { Redirect, RouteComponentProps } from 'react-router-dom';
Joi.extend(require('joi-phone-number'));

export interface SignupProps extends RouteComponentProps {}

export interface SignupState {
	data: {
		name: string;
		email: string;
		password: string;
		mobileNumber: string;
	};
	errors: ErrorContainer;
	passType: PassType;
}

class Signup extends CommonForm<SignupProps, SignupState> {
	state = {
		data: {
			name: '',
			email: '',
			password: '',
			mobileNumber: '',
		},
		errors: { name: '', email: '', password: '', mobileNumber: '' },
		passType: 'password' as PassType,
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
			.error(() => 'first message')
			.required()
			.label('Mobile Number')
			.error((errors: Object[]): any => {
				console.log(errors);
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

	doSubmit = () => {};

	render() {
		// if (getCurrentUser()) return <Redirect to='/' />; //TODO
		return (
			<React.Fragment>
				<SignNav />
				<div className='mainSignContainer'>
					<div className='formBox'>
						<h1>Welcome to Len-Den,</h1>
						<h2>Please register with us to start your barter journey !</h2>

						{this.renderInput('Name', 'name', this.state.errors.name)}
						{this.renderInput(
							'Mobile Number',
							'mobileNumber',
							this.state.errors.mobileNumber,
							'number'
						)}
						{this.renderInput('Email', 'email', this.state.errors.email)}
						{this.renderInput(
							'Password',
							'password',
							this.state.errors.password,
							'',
							'Password must be atleast 6 characters'
						)}

						<div
							onClick={this.handleSubmit}
							style={{ marginTop: '30px' }}
							className='darkButton'>
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
			</React.Fragment>
		);
	}
}

export default Signup;