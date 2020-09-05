import React from 'react';
import Joi from 'joi';
import CommonForm, { ErrorContainer } from './../../common/commonForm';
import { RootState } from '../../../app/models';
import { connect } from 'react-redux';
import SubNav from '../../common/subNav';
import { RouteComponentProps } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import ToastMessage from '../../common/toastMessage';
import { UserAddress } from './../../../app/models/auth';
import { updateAddress } from '../../../app/auth/userDetails';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

export interface ChangeAddressProps extends RouteComponentProps {
	loading: boolean;
	error: string;
	address: UserAddress;
	updateAddress: (address: UserAddress) => any;
}

export interface ChangeAddressState {
	data: UserAddress;
	errors: ErrorContainer;
}

class ChangeAddress extends CommonForm<ChangeAddressProps, ChangeAddressState> {
	state = {
		data: this.props.address,
		errors: {
			city: '',
			country: '',
			houseNumber: '',
			area: '',
			state: '',
			landmark: '',
			postalCode: '',
		},
	};

	UNSAFE_componentWillReceiveProps(nextProps: ChangeAddressProps) {
		if (!_.isEqual(this.props.address, nextProps.address)) {
			this.setState({ data: nextProps.address });
		}
	}

	schema = {
		houseNumber: Joi.string().required().label('House Number'),
		area: Joi.string().required().label('Area'),
		state: Joi.string().required().label('State'),
		city: Joi.string().required().label('City'),
		postalCode: Joi.string().min(6).max(8).required().label('Postal Code'),
		landmark: Joi.string().allow('').label('Landmark'),
		country: Joi.string().required().label('Country'),
	};

	doSubmit = async () => {
		await this.props.updateAddress(this.state.data);

		if (!this.props.error) {
			this.props.history.push('/my-account');
			toast(<ToastMessage title='Your Address was updated successfully !' />, {
				containerId: 'messageToastContainer',
				className: 'toasty',
			});
		}
	};
	render() {
		return (
			<React.Fragment>
				<SubNav title='My Address' />
				<div className='container' style={{ marginTop: '2rem' }}>
					{this.renderInput(
						'House Number',
						'houseNumber',
						this.state.errors.houseNumber
					)}
					{this.renderInput('Area', 'area', this.state.errors.area)}
					{this.renderInput('State', 'state', this.state.errors.state)}
					{this.renderInput('City', 'city', this.state.errors.city)}
					{this.renderInput(
						'Postal Code',
						'postalCode',
						this.state.errors.postalCode,
						'number'
					)}
					{this.renderInput('Landmark', 'landmark', this.state.errors.landmark)}
					{this.renderInput('Country', 'country', this.state.errors.country)}

					{this.renderLoader(this.props.loading)}
					{this.renderErrorAlert()}

					<div
						className='darkButton'
						onClick={this.handleSubmit}
						id='saveBtn'
						style={{ marginTop: '2rem' }}>
						Save
					</div>
					<div
						className='lightButton'
						onClick={() => this.props.history.push('/my-account')}
						style={{ marginBottom: '2rem' }}>
						Cancel
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	const { loading, error, user } = state.auth.userDetails;

	if (user.address) return { loading, error, address: user.address };

	return {
		loading,
		error,
		address: {
			city: '',
			country: '',
			houseNumber: '',
			area: '',
			state: '',
			landmark: '',
			postalCode: '',
		},
	};
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => ({
	updateAddress: (data: UserAddress) => dispatch(updateAddress(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAddress);
