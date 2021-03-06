import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserForm, { UserFormState, PassType } from '../../classes/userForm';
import Joi from 'joi';
import GenericNav from '../common/genericNav';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../app/models';
import PageLoader from '../common/pageLoader';
import {
	verifyPasswordToken,
	verifyTokenErrors,
	resetPassword,
} from './../../app/auth/login';
import GenericIcons from '../../icons/generic';
import { Modal } from 'react-bootstrap';

interface MatchParams {
	token: string;
}

export interface ResetPasswordProps
	extends RouteComponentProps<MatchParams>,
		ReduxProps {}

export interface ResetPasswordState extends UserFormState {
	data: {
		newPassword: string;
		confirmPassword: string;
	};
	errors: { newPassword: string; confirmPassword: string };
	passType: {
		newPassword: PassType;
	};
	showModal: boolean;
}

class ResetPassword extends UserForm<ResetPasswordProps, ResetPasswordState> {
	state = {
		data: {
			newPassword: '',
			confirmPassword: '',
		},
		errors: { newPassword: '', confirmPassword: '' },
		passType: {
			newPassword: 'password' as PassType,
		},
		showModal: false,
	};
	componentDidMount = async () => {
		const token = this.props.match.params.token;
		await this.props.verifyToken(token);
		if (this.props.error && this.props.error === verifyTokenErrors.invalidEmail)
			return this.props.history.replace('/not-found');
	};

	doSubmit = async () => {
		if (this.state.data.newPassword !== this.state.data.confirmPassword) {
			let errors = { ...this.state.errors };
			errors.confirmPassword = 'Passwords do not match';
			return this.setState({ errors });
		}

		await this.props.resetPassword({
			password: this.state.data.newPassword,
			token: this.props.match.params.token,
		});

		if (!this.props.error) {
			this.setState({ showModal: true });
		}
	};
	schema = {
		newPassword: Joi.string().min(6).max(255).required().label('New Password'),
		confirmPassword: Joi.string().required().label('Confirm Password'),
	};
	render() {
		if (this.props.loadingPage) return <PageLoader />;
		else {
			if (this.props.error === verifyTokenErrors.expiredEmail) {
				return (
					<React.Fragment>
						<GenericNav />
						<div className='container tokenExpired'>
							<div className='iconContainer'>
								<GenericIcons name='expired' />
							</div>
							<p>{this.props.error}</p>
							{/* TODO Test */}
							<div
								onClick={() => this.props.history.replace('/login')}
								className='darkButton'>
								Login Page
							</div>
						</div>
					</React.Fragment>
				);
			}

			return (
				<React.Fragment>
					<GenericNav />
					<div className='container resetPassword'>
						<h1>Reset your password ?</h1>
						<h2>
							Just fill in your new password and we'll change it for you !
						</h2>

						{this.renderPassInput(
							'New Password',
							'newPassword',
							this.state.errors.newPassword,
							undefined,
							true
						)}
						{this.renderPassInput(
							'Confirm Password',
							'confirmPassword',
							this.state.errors.confirmPassword,
							undefined,
							false,
							true
						)}

						{this.renderLoader(this.props.loading)}
						{this.renderErrorAlert()}

						<div
							className='darkButton'
							onClick={this.handleSubmit}
							id='saveBtn'>
							Save
						</div>
						<div
							className='lightButton'
							onClick={() => this.props.history.push('/login')}>
							Cancel
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
							Your Password has been changed successfully. Please Login now to
							continue
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
}

const mapStateToProps = (state: RootState) => {
	const { error, loading, loadingPage } = state.auth.login;
	return {
		error,
		loading,
		loadingPage,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	verifyToken: (token: string) => dispatch(verifyPasswordToken(token)),
	resetPassword: (data: { token: string; password: string }) =>
		dispatch(resetPassword(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ResetPassword);
