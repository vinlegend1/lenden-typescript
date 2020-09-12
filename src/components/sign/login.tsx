import React from 'react';
import UserForm, { UserFormState, PassType } from '../../classes/userForm';
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
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import GenericIcons from '../../icons/generic';
import { Modal } from 'react-bootstrap';
import {
	sendVerificationEmail,
	verifyEmailErrors,
} from './../../app/auth/login';

export interface LoginProps extends RouteComponentProps, ReduxProps {}
export interface LoginState extends UserFormState {
	data: { email: string; password: string };
	errors: { email: string; password: string };
	passType: {
		password: PassType;
	};
	showNotVerifiedModal: boolean;
	showSuccessModal: boolean;
}

class Login extends UserForm<LoginProps, LoginState> {
	state = {
		data: { email: '', password: '' },
		errors: { email: '', password: '' },
		passType: { password: 'password' as PassType },
		showNotVerifiedModal: false,
		showSuccessModal: false,
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
		if (
			this.props.error &&
			this.props.error === verifyEmailErrors.notVerified
		) {
			this.setState({ showNotVerifiedModal: true });
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
						{this.renderPassInput(
							'Password',
							'password',
							this.state.errors.password,
							undefined,
							true,
							true
						)}

						<div className='loginOptions'>
							<div>
								<div className='pretty p-svg p-curve'>
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

						{this.renderLoader(this.props.loading)}
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
					show={this.state.showNotVerifiedModal}
					keyboard={false}
					onHide={() => this.setState({ showNotVerifiedModal: false })}>
					<Modal.Body>
						<GenericIcons name='error' />
						Your email hasn't been verified yet. Please verify it using the link
						provided in your mail or re-send link.
						{this.renderLoader(this.props.modalLoading)}
						<div
							onClick={async () => {
								await this.props.sendVerificationEmail(this.state.data.email);
								if (!this.props.error) {
									this.setState({
										showNotVerifiedModal: false,
										showSuccessModal: true,
									});
								} else this.setState({ showNotVerifiedModal: false });
							}}
							className='darkButton'>
							Resend Link
						</div>
					</Modal.Body>
				</Modal>
				<Modal
					className='notificationMessage'
					size='lg'
					centered
					show={this.state.showSuccessModal}
					keyboard={false}
					onHide={() => this.setState({ showSuccessModal: false })}>
					<Modal.Body>
						<GenericIcons name='success' />
						Verification mail has been sent successfully. Kindly verify it from
						your mailbox before logging in.
						<div
							onClick={() => {
								this.props.history.push('/login');
								this.setState({
									showNotVerifiedModal: false,
									showSuccessModal: false,
								});
							}}
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
	const { error, loading, modalLoading } = state.auth.login;
	return {
		error,
		loading,
		modalLoading,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	logInUser: (data: SignInUser, location: any) =>
		dispatch(logInUser(data, location)),
	updateError: (error: string) => dispatch(updateError(error)),
	verifyUserAccount: (email: string) => dispatch(verifyUser(email)),
	sendVerificationEmail: (email: string) =>
		dispatch(sendVerificationEmail(email)),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Login);
