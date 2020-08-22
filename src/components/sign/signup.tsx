import React from 'react';
import CommonForm, { PassType } from './../common/commonForm';
import SignNav from './signNav';
import Joi from 'joi';
import { getCurrentUser } from './../../services/authService';
import { Redirect, RouteComponentProps } from 'react-router-dom';

export interface SignupProps extends RouteComponentProps {}

export interface SignupState {
	data: {
		name: string;
		email: string;
		password: string;
		mobileNumber: string;
	};
	errors: {};
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
		errors: {},
		passType: 'password' as PassType,
	};

	schema = {
		name: Joi.string().min(3).max(255).required().label('Name'),
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label('Email'),
		password: Joi.string().required().label('Password'),
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

						{this.renderInput('Name', 'name')}
						{this.renderInput('Mobile Number', 'mobileNumber', 'number')}
						{this.renderInput('Email', 'email')}
						{this.renderInput('Password', 'password')}

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
