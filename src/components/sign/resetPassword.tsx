import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import CommonForm, { ErrorContainer, PassType } from './../common/commonForm';
import Joi from 'joi';
import GenericNav from '../common/genericNav';
import { connect } from 'react-redux';
import { Dispatch, Action } from '@reduxjs/toolkit';
import { RootState } from '../../app/models';
import PageLoader from '../common/pageLoader';
import { verifyPasswordToken } from './../../app/auth/login';

interface MatchParams {
	token: string;
}

export interface ResetPasswordProps extends RouteComponentProps<MatchParams> {
	loading: boolean;
	error: string;
	loadingPage: boolean | undefined;
	verifyToken: (token: string) => Action;
}

export interface ResetPasswordState {
	data: {
		newPassword: string;
		confirmPassword: string;
	};
	errors: ErrorContainer;
	passType: {
		newPassword: PassType;
	};
}

class ResetPassword extends CommonForm<ResetPasswordProps, ResetPasswordState> {
	state = {
		data: {
			newPassword: '',
			confirmPassword: '',
		},
		errors: { newPassword: '', confirmPassword: '' },
		passType: {
			newPassword: 'password' as PassType,
		},
	};
	componentDidMount() {
		const token = this.props.match.params.token;
		this.props.verifyToken(token);
	}

	doSubmit = () => {
		if (this.state.data.newPassword !== this.state.data.confirmPassword) {
			let errors = { ...this.state.errors };
			errors.confirmPassword = 'Passwords do not match';
			return this.setState({ errors });
		}
	};
	schema = {
		newPassword: Joi.string().min(6).max(255).required().label('New Password'),
		confirmPassword: Joi.string().required().label('Confirm Password'),
	};
	render() {
		if (this.props.loadingPage) return <PageLoader />;
		else {
			if (this.props.error) {
				if (this.props.error === 'invalid token')
					return <Redirect to='/not-found' />;
				return (
					<React.Fragment>
						<GenericNav />
						<div className='container'>{this.props.error}</div>
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

						{this.renderInput(
							'New Password',
							'newPassword',
							this.state.errors.newPassword,
							'password',
							undefined,
							true
						)}
						{this.renderInput(
							'Confirm Password',
							'confirmPassword',
							this.state.errors.confirmPassword,
							'password',
							undefined,
							false,
							true
						)}

						{this.renderLoader()}

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
	// forgotPassword: (email: string) => dispatch(forgotPassword(email)),
	verifyToken: (token: string) => dispatch(verifyPasswordToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
