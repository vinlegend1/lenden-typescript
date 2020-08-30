import * as React from 'react';
import CommonForm, {
	ErrorContainer,
	PassType,
} from './../../common/commonForm';
import SubNav from '../../common/subNav';
import { RouteComponentProps } from 'react-router-dom';
import Joi from 'joi';

export interface changePasswordProps extends RouteComponentProps {
	loading: boolean;
	error: string;
}

export interface changePasswordState {
	data: {
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
	};
	errors: ErrorContainer;
	passType: {
		currentPassword: PassType;
		newPassword: PassType;
	};
}

class changePassword extends CommonForm<
	changePasswordProps,
	changePasswordState
> {
	state = {
		data: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		errors: { currentPassword: '', newPassword: '', confirmPassword: '' },
		passType: {
			currentPassword: 'password' as PassType,
			newPassword: 'password' as PassType,
		},
	};

	schema = {
		currentPassword: Joi.string().required().label('Current Password'),
		newPassword: Joi.string().min(6).max(255).required().label('New Password'),
		confirmPassword: Joi.string().required().label('Confirm Password'),
	};
	doSubmit = () => {
		if (this.state.data.newPassword !== this.state.data.confirmPassword) {
			let errors = { ...this.state.errors };
			errors.confirmPassword = 'Passwords do not match';
			return this.setState({ errors });
		}
		console.log(this.state.data.currentPassword, this.state.data.newPassword);

		// TODO API CALL SUCCESS

		// delete token on success

		// ask to login again
	};

	render() {
		return (
			<React.Fragment>
				<SubNav title='Change Password' />
				<div className='container changePassword'>
					<h1>Reset your password</h1>
					<h2>
						Just fill in your existing and new password and we'll change it for
						you !
					</h2>
					{this.renderInput(
						'Current Password',
						'currentPassword',
						this.state.errors.currentPassword,
						'password',
						undefined,
						true
					)}
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
						undefined,
						true
					)}
					<div className='darkButton' onClick={this.handleSubmit} id='saveBtn'>
						Save
					</div>
					<div
						className='lightButton'
						onClick={() => this.props.history.push('/my-account')}>
						Cancel
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default changePassword;
