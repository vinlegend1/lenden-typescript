import * as React from 'react';
import UserForm, { UserFormState } from '../../../classes/userForm';
import SubNav from '../../common/subNav';
import { RouteComponentProps } from 'react-router-dom';
import Joi from 'joi';
import { RootState } from '../../../app/models';
import { Dispatch } from 'redux';
import { changeUserPassword } from '../../../app/auth/userDetails';
import { connect, ConnectedProps } from 'react-redux';
import { Modal } from 'react-bootstrap';
import GenericIcons from '../../../icons/generic';
import { PassType } from '../../../app/models/auth';

export interface changePasswordProps extends RouteComponentProps, ReduxProps {}

export interface changePasswordState extends UserFormState {
	data: {
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
	};
	passType: {
		currentPassword: PassType;
		newPassword: PassType;
	};
	showModal: boolean;
}

class changePassword extends UserForm<
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
					{this.renderPassInput(
						'Current Password',
						'currentPassword',
						this.state.errors.currentPassword,
						undefined,
						true
					)}
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
					{this.renderErrorAlert()}
					{this.renderLoader(this.props.loading)}

					<div className='darkButton' onClick={this.handleSubmit} id='saveBtn'>
						Save
					</div>
					<div
						className='lightButton'
						onClick={() => this.props.history.goBack()}>
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

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(changePassword);
