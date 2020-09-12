import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../app/models';
import { Dispatch, Action } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import UserForm, { UserFormState } from '../../../classes/userForm';
import Joi from 'joi';
import EditGravatar from './editGravatar';
import _ from 'lodash';
import SubNav from '../../common/subNav';
import { editProfile } from './../../../app/auth/userDetails';
import { toast } from 'react-toastify';
import ToastMessage from '../../common/toastMessage';

interface EditProfileData {
	name: string;
	mobileNumber: string;
	gravatarId: string;
}
export interface EditProfileProps extends RouteComponentProps, ReduxProps {}

export interface EditProfileState extends UserFormState {
	data: {
		name: string;
		mobileNumber: string;
	};
	errors: {
		name: string;
		mobileNumber: string;
	};
	gravatar: string;
}

class EditProfile extends UserForm<EditProfileProps, EditProfileState> {
	state = {
		gravatar: this.props.user.gravatarId,
		data: {
			name: this.props.user.name,
			mobileNumber: this.props.user.mobileNumber,
		},
		errors: { name: '', mobileNumber: '' },
	};
	UNSAFE_componentWillReceiveProps(nextProps: EditProfileProps) {
		if (
			!_.isEqual(this.props.user.gravatarId, nextProps.user.gravatarId) ||
			!_.isEqual(this.props.user.name, nextProps.user.name) ||
			!_.isEqual(this.props.user.mobileNumber, nextProps.user.mobileNumber)
		) {
			const data = { ...this.state.data };
			data.name = nextProps.user.name;
			data.mobileNumber = nextProps.user.mobileNumber;

			this.setState({ gravatar: nextProps.user.gravatarId, data });
		}
	}

	schema = {
		name: Joi.string().min(3).max(255).required().label('Name'),
		mobileNumber: Joi.string()
			.length(10)
			.pattern(/^[0-9]+$/)
			.error(() => 'first message')
			.required()
			.label('Mobile Number')
			.error((errors: any) => {
				errors.forEach((err: any) => {
					switch (err.code) {
						case 'string.pattern.base':
							err.message = '"Mobile Number" should be a valid Mobile Number';
							break;
					}
				});
				return errors;
			}),
	};
	doSubmit = async () => {
		await this.props.editProfile({
			...this.state.data,
			gravatarId: this.state.gravatar.split('type')[1],
		});
		if (!this.props.error) {
			this.props.history.goBack();
			toast(
				<ToastMessage title='Your profile has been updated successfully !' />,
				{
					containerId: 'messageToastContainer',
					className: 'toasty',
				}
			);
		}
	};

	render() {
		return (
			<React.Fragment>
				<SubNav title='Edit Profile' />
				<EditGravatar
					gravatar={this.state.gravatar}
					handleGravatarChange={gravatar => this.setState({ gravatar })}
				/>
				<div className='container editDetailsContainer'>
					{this.renderInput('Full Name', 'name', this.state.errors.name)}
					{this.renderMobileNumberInput(
						'Mobile Number',
						this.state.errors.mobileNumber
					)}
					{this.renderLoader(this.props.loading)}
					{this.renderErrorAlert()}
					<div className='darkButton' onClick={this.handleSubmit} id='saveBtn'>
						Save
					</div>
					<div
						className='lightButton'
						onClick={() => this.props.history.push('/my-account')}
						id='cancelBtn'>
						Cancel
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const { user, error, loading } = state.auth.userDetails;
	return {
		user,
		error,
		loading,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	editProfile: (data: EditProfileData) => dispatch(editProfile(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(EditProfile);
