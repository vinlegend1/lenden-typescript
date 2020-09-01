import React from 'react';
import CommonForm from './../common/commonForm';
import Joi from 'joi';
import GenericNav from '../common/genericNav';
import { RouteComponentProps } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import GenericIcons from '../../icons/generic';
import { RootState } from '../../app/models';
import { forgotPassword } from '../../app/auth/login';
import { connect } from 'react-redux';
import { Dispatch, Action } from '@reduxjs/toolkit';

export interface ForgotPasswordProps extends RouteComponentProps {
	loading: boolean;
	error: string;
	forgotPassword: (email: string) => Action;
}

export interface ForgotPasswordState {
	data: { email: string };
	errors: { email: string };
	showModal: boolean;
	sentOnce: boolean;
}

class ForgotPassword extends CommonForm<
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
						undefined,
						undefined,
						false,
						true
					)}

					{this.renderLoader()}

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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
