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

interface Address {
	city: string;
	country: string;
	houseNumber: string;
	streetName: string;
	state: string;
	landmark?: string;
	postalCode: string;
	mobileNumber: string;
}

export interface ChangeAddressProps extends RouteComponentProps {
	loading: boolean;
	error: string;
	address: Address;
}

export interface ChangeAddressState {
	data: Address;
	errors: ErrorContainer;
}

class ChangeAddress extends CommonForm<ChangeAddressProps, ChangeAddressState> {
	state = {
		data: this.props.address,
		errors: {
			city: '',
			country: '',
			houseNumber: '',
			streetName: '',
			state: '',
			landmark: '',
			postalCode: '',
			mobileNumber: '',
		},
	};

	UNSAFE_componentWillReceiveProps(nextProps: ChangeAddressProps) {
		if (!_.isEqual(this.props.address, nextProps.address)) {
			this.setState({ data: nextProps.address });
		}
	}

	schema = {
		houseNumber: Joi.string().required().label('House Number'),
		streetName: Joi.string().required().label('Street'),
		state: Joi.string().required().label('State'),
		city: Joi.string().required().label('City'),
		postalCode: Joi.string().min(6).max(8).required().label('Postal Code'),
		landmark: Joi.string().allow('').label('Landmark'),
		country: Joi.string().required().label('Country'),
		mobileNumber: Joi.number().required().label('Mobile Number'),
	};

	doSubmit = () => {
		console.log(this.state.data);
		// TODO API CALL - managed by redux
		// TODO update address - redux action

		this.props.history.push('/my-account');
		toast(<ToastMessage title='Your Address was updated successfully !' />, {
			containerId: 'messageToastContainer',
			className: 'toasty',
		});
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
					{this.renderInput(
						'Street',
						'streetName',
						this.state.errors.streetName
					)}
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
	const { address } = state.auth.user;

	if (address) return { address };

	return {
		address: {
			city: '',
			country: '',
			houseNumber: '',
			streetName: '',
			state: '',
			landmark: '',
			postalCode: '',
			mobileNumber: '',
		},
	};
};

export default connect(mapStateToProps, null)(ChangeAddress);
