import * as React from 'react';
import CommonForm, {
	ErrorContainer,
	PassType,
} from './../../common/commonForm';
import SubNav from '../../common/subNav';
import { RouteComponentProps } from 'react-router-dom';
import Joi from 'joi';
import { RootState } from '../../../app/models';
import { Dispatch, Action } from 'redux';
import { changeUserPassword } from '../../../app/auth/userDetails';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import GenericIcons from '../../../icons/generic';

export interface changePasswordProps extends RouteComponentProps {
	loading: boolean;
	error: string;
	changeUserPassword: (data: {
		newPassword: string;
		oldPassword: string;
	}) => Action;
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
	showModal: boolean;
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
		showModal: false,
	};

	schema = {
		currentPassword: Joi.string().required().label('Current Password'),
		newPassword: Joi.string().min(6).max(255).required().label('New Password'),
		confirmPassword: Joi.string().required().label('Confirm Password'),
	};
	doSubmit = async () => {
		if (this.state.data.newPassword !== this.state.data.confirmPassword) {
			let errors = { ...this.state.errors };
			errors.confirmPassword = 'Passwords do not match';
			return this.setState({ errors });
		}
		await this.props.changeUserPassword({
			oldPassword: this.state.data.currentPassword,
			newPassword: this.state.data.newPassword,
		});
		if (!this.props.error) {
			this.setState({ showModal: true });
		}
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
					{this.renderErrorAlert()}
					{this.renderLoader(this.props.loading)}

					<div className='darkButton' onClick={this.handleSubmit} id='saveBtn'>
						Save
					</div>
					<div
						className='lightButton'
						onClick={() => this.props.history.push('/my-account')}>
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
						Your password has been changed successfully! Please login again to
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

const mapStateToProps = (state: RootState) => {
	const { loading, error } = state.auth.userDetails;

	return {
		loading,
		error,
	};
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
	changeUserPassword: (data: { newPassword: string; oldPassword: string }) =>
		dispatch(changeUserPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(changePassword);
