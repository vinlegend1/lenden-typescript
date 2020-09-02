import React from 'react';
import CommonForm, { PassType, ErrorContainer } from './../common/commonForm';
import GenericNav from '../common/genericNav';
import Joi from 'joi';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../app/models';
import {
	logInUser,
	updateError,
	SignInUser,
	verifyUser,
} from '../../app/auth/login';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import GenericIcons from '../../icons/generic';
import { Modal } from 'react-bootstrap';

export interface LoginProps extends RouteComponentProps {
	error: string;
	loading: boolean;
	logInUser: (data: SignInUser, location: any) => Action;
	updateError: (error: string) => Action;
	verifyUserAccount: (email: string) => Action;
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
	showModal: boolean;
}

class Login extends CommonForm<LoginProps, LoginState> {
	state = {
		data: { email: '', password: '' },
		errors: { email: '', password: '' },
		passType: { password: 'password' as PassType },
		showModal: false,
	};

	schema = {
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label('Email'),
		password: Joi.string().required().label('Password'),
	};

	doSubmit = async () => {
		const { data } = this.state;
		const { logInUser, location } = this.props;
		await this.props.verifyUserAccount(this.state.data.email);
		if (this.props.error) {
			this.setState({ showModal: true });
		}
		if (!this.props.error) {
			logInUser(data, location);
		}
	};

	render() {
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
								className='forgotMessage'>
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
				<Modal
					className='notificationMessage'
					size='lg'
					centered
					show={this.state.showModal}
					keyboard={false}
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Body>
						<GenericIcons name='error' />
						Your email hasn't been verified yet. Please verify it using the link
						provided in your mail or re-send link.
						<div
							onClick={() => this.props.history.push('/login')}
							className='darkButton'>
							Resend Link
						</div>
					</Modal.Body>
				</Modal>
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
	verifyUserAccount: (email: string) => dispatch(verifyUser(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
