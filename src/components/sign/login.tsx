import React from 'react';
import CommonForm from './../common/commonForm';
import SignNav from './signNav';
import Joi from 'joi';
import { getCurrentUser } from './../../services/authService';
import { Redirect } from 'react-router-dom';

type PassType = 'password' | 'text';
export interface LoginProps {}
export interface LoginState {
	data: {
		email: string;
		password: string;
	};
	errors: {};
	passType: PassType;
}

class Login extends CommonForm<LoginProps, LoginState> {
	state = {
		data: { email: '', password: '' },
		errors: {},
		passType: 'password' as PassType,
	};

	schema = {
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label('Email'),
		password: Joi.string().required().label('Password'),
	};

	render() {
		// if (getCurrentUser()) return <Redirect to='/' />; //TODO
		return (
			<React.Fragment>
				<SignNav />
				<div className='mainSignContainer'>
					<div className='formBox'>
						<h1>Welcome Back,</h1>
						<h2>Please login to your Account</h2>

						{this.renderInput('Email', 'email')}
						{this.renderInput('Password', 'password')}

						<div className='loginOptions'>
							<div>
								<div className='pretty p-image p-curve p-smooth'>
									<input type='checkbox' />
									<div className='state'>
										<img
											className='image'
											src='/icons/tick.svg'
											alt='signed-in'
										/>
										<label>Keep me signed in</label>
									</div>
								</div>
							</div>

							<div className='forgotPassword'>Forgot Password?</div>
						</div>

						<div className='darkButton'>Login</div>
						<div className='separator'>or</div>
						<div className='lightButton'>Create an account</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;
