import React from 'react';
import UserForm, { UserFormState } from '../../classes/userForm';
import Joi from 'joi';
import GenericNav from '../common/genericNav';
import { RouteComponentProps } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import GenericIcons from '../../icons/generic';
import { RootState } from '../../app/models';
import { forgotPassword } from '../../app/auth/login';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

export interface ForgotPasswordProps extends RouteComponentProps, ReduxProps {}

export interface ForgotPasswordState extends UserFormState {
	data: {
		email: string;
	};
	errors: {
		email: string;
	};
	showModal: boolean;
	sentOnce: boolean;
}

class ForgotPassword extends UserForm<
	ForgotPasswordProps,
	ForgotPasswordState
> {
	state = {
		data: {
			email: '',
		},
		errors: {
			email: '',
		},
		showModal: false,
		sentOnce: false,
	};

	schema = {
		email: Joi.string()
			.email({ tlds: { allow: false } })
			.required()
			.label('Email'),
	};

	doSubmit = async () => {
		await this.props.forgotPassword(this.state.data.email);

		if (!this.props.error) this.setState({ showModal: true, sentOnce: true });
	};
	render() {
		return (
			<React.Fragment>
				<GenericNav />
				<div className='container forgotPassword'>
					<h1>Forgot your password ?</h1>
					<h2>
						Don't worry! Just fill in your email and we'll send you a link to
						reset password
					</h2>

					{this.renderInput(
						'Email',
						'email',
						this.state.errors.email,
						'text',
						true
					)}

					{this.renderLoader(this.props.loading)}
					{this.renderErrorAlert()}

					<div className='darkButton' onClick={this.handleSubmit} id='saveBtn'>
						{`${this.state.sentOnce ? 'Res' : 'S'}end Link`}
					</div>
					<div
						className='lightButton'
						onClick={() => this.props.history.push('/my-account')}>
						Login again
					</div>
				</div>
				<Modal
					className='notificationMessage'
					size='lg'
					centered
					show={this.state.showModal}
					// backdrop='static'
					keyboard={false}
					onHide={() => this.setState({ showModal: false })}>
					<Modal.Body>
						<GenericIcons name='success' />
						We've sent a password reset link to your email. Click on the link
						and reset your password!
						<div
							onClick={() => this.props.history.push('/login')}
							className='darkButton'>
							Login
						</div>
						<div
							onClick={() => {
								this.props.history.push('/user/forgot-password');
								this.setState({ showModal: false });
							}}
							className='lightButton'>
							Send again?
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
	forgotPassword: (email: string) => dispatch(forgotPassword(email)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ForgotPassword);
