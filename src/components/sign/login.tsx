import React from 'react';
import CommonForm, { PassType, ErrorContainer } from './../common/commonForm';
import GenericNav from '../common/genericNav';
import Joi from 'joi';
import { getCurrentUser } from './../../services/authService';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../app/models';
import { logInUser, updateError, SignInUser } from '../../app/auth/login';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import GenericIcons from '../../icons/generic';

export interface LoginProps extends RouteComponentProps {
	error: string;
	loading: boolean;
	logInUser: (data: SignInUser, location: any) => Action;
	updateError: (error: string) => Action;
}
export interface LoginState {
	data: {
		email: string;
		password: string;
	};
	errors: ErrorContainer;
	passType: {
		password: PassType;
	};
}

class Login extends CommonForm<LoginProps, LoginState> {
	state = {
		data: { email: '', password: '' },
		errors: { email: '', password: '' },
		passType: { password: 'password' as PassType },
	};

	schema = {
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label('Email'),
		password: Joi.string().required().label('Password'),
	};

	doSubmit = () => {
		const { data } = this.state;
		const { logInUser, location } = this.props;
		logInUser(data, location);
	};

	render() {
		if (getCurrentUser()) return <Redirect to='/' />; //TODO
		return (
			<React.Fragment>
				<GenericNav />
				<div className='mainSignContainer'>
					<div className='formBox'>
						<h1>Welcome Back,</h1>
						<h2>Please login to your account</h2>

						{this.renderInput('Email', 'email', this.state.errors.email)}
						{this.renderInput(
							'Password',
							'password',
							this.state.errors.password,
							'password',
							undefined,
							undefined,
							true
						)}

						<div className='loginOptions'>
							<div>
								<div className='pretty p-svg p-curve p-smooth'>
									<input type='checkbox' />
									<div className='state'>
										<GenericIcons className='svg' name='tick' />
										<label>Keep me signed in</label>
									</div>
								</div>
							</div>

							<div
								onClick={() => this.props.history.push('/user/forgot-password')}
								className='forgotPassword'>
								Forgot Password?
							</div>
						</div>

						{this.renderLoader()}
						{this.renderErrorAlert()}

						<div onClick={this.handleSubmit} className='darkButton'>
							Login
						</div>
						<div className='separator'>or</div>
						<div
							onClick={() => this.props.history.push('/signup')}
							className='lightButton'>
							Create an account
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state: RootState) => {
	const { error, loading } = state.auth.login;
	return {
		error,
		loading,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	logInUser: (data: SignInUser, location: any) =>
		dispatch(logInUser(data, location)),
	updateError: (error: string) => dispatch(updateError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
