import { createSlice } from '@reduxjs/toolkit';
import { UserSlice, UserDetails } from '../models/auth';
import { apiCallBegan } from '../api';
import { getCurrentUser, getToken } from '../../services/authService';
import { RootState, ActionWithPayload } from '../models/index';
import { Dispatch } from 'redux';
import { userLoggedOut } from './login';
import { ErrorResponsePayload } from '../models/api';
import { UserAddress } from './../models/auth';

interface FetchedAddress {
	city: string;
	country: string;
	housenumber: string;
	area: string;
	state: string;
	landmark?: string;
	postalcode: string;
}

interface FetchedInfo {
	name: string;
	mobilenumber: string;
	gravatarid: string;
	addressdetails?: {
		housenumber: string;
		area: string;
		state: string;
		city: string;
		country: string;
		landmark?: string;
		postalcode: string;
	};
}

const mapToViewModel = (data: FetchedAddress) => ({
	city: data.city,
	country: data.country,
	houseNumber: data.housenumber,
	area: data.area,
	state: data.state,
	landmark: data.landmark,
	postalCode: data.postalcode.toString(),
});

const initialState: UserSlice = {
	user: {
		userId: '',
		name: '',
		token: '',
		email: '',
		gravatarId: '',
		mobileNumber: '',
	},

	error: '',
	success: '',
	loading: false,
};

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userReceivedFromToken: (
			{ user },
			action: ActionWithPayload<{
				userId: string;
				email: string;
				token: string;
			}>
		) => {
			const { userId, token, email } = action.payload;

			user.userId = userId;
			user.email = email;
			user.token = token;
		},

		getUserInfoSuccess: (
			{ user },
			action: ActionWithPayload<{ data: FetchedInfo }>
		) => {
			const {
				name,
				mobilenumber,
				gravatarid,
				addressdetails,
			} = action.payload.data;

			user.name = name;
			user.mobileNumber = mobilenumber;
			user.gravatarId = `type${gravatarid}`;
			if (addressdetails) user.address = mapToViewModel(addressdetails);
			else user.address = undefined;
		},

		editProfileInitiated: state => {
			state.error = '';
			state.success = '';
			state.loading = true;
		},

		editProfileSuccess: (
			state,
			action: ActionWithPayload<{
				data: {
					name: string;
					mobilenumber: string;
					gravatarid: string;
				};
			}>
		) => {
			const { name, mobilenumber, gravatarid } = action.payload.data;
			state.success = 'successfully verified';
			state.error = '';
			state.loading = false;
			state.user.name = name;
			state.user.mobileNumber = mobilenumber;
			state.user.gravatarId = `type${gravatarid}`;
		},
		editProfileFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			state.success = '';
			if (typeof action.payload === 'string') state.error = action.payload;
			else state.error = action.payload.data.message.trim();

			state.loading = false;
		},
		updateAddressInitiated: state => {
			state.error = '';
			state.success = '';
			state.loading = true;
		},

		updateAddressSuccess: (
			state,
			action: ActionWithPayload<{
				data: FetchedAddress;
			}>
		) => {
			state.user.address = mapToViewModel(action.payload.data);
			state.error = '';
			state.success = 'Successfully Updated!';
			state.loading = false;
		},
		updateAddressFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			if (typeof action.payload === 'string') state.error = action.payload;
			else state.error = action.payload.data.message.trim();

			state.loading = false;
			state.success = '';
		},

		changePasswordInitiated: state => {
			state.error = '';
			state.success = '';
			state.loading = true;
		},
		changePasswordSuccess: state => {
			state.error = '';
			state.success = 'Successfully Updated';
			state.loading = false;
		},
		changePasswordFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			if (typeof action.payload === 'string') state.error = action.payload;
			else {
				if (action.payload.status === 400) state.error = 'Invalid password';
				else state.error = action.payload.data.message.trim();
			}
			state.success = '';
			state.loading = false;
		},
	},
});

export default slice.reducer;

const {
	userReceivedFromToken,
	editProfileInitiated,
	editProfileSuccess,
	getUserInfoSuccess,
	editProfileFailed,
	updateAddressInitiated,
	updateAddressSuccess,
	updateAddressFailed,
	changePasswordInitiated,
	changePasswordFailed,
} = slice.actions;

export const { changePasswordSuccess } = slice.actions;

export const getUser = () => (dispatch: Dispatch) => {
	const token = getToken();
	if (token) {
		const user = getCurrentUser();
		if (user) {
			dispatch(
				userReceivedFromToken({
					userId: user.userid,
					email: user.sub,
					token,
				})
			);
		}
	}
};

export const editProfile = ({
	name,
	mobileNumber,
	gravatarId,
}: {
	name: string;
	mobileNumber: string;
	gravatarId: string;
}) =>
	apiCallBegan({
		method: 'put',
		url: 'users/editprofile',
		data: { name, mobilenumber: mobileNumber, gravatarid: gravatarId },
		onStart: editProfileInitiated.type,
		onSuccess: editProfileSuccess.type,
		onError: editProfileFailed.type,
	});

export const getUserInfo = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const { userId } = getState().auth.userDetails.user;
	if (userId)
		return dispatch(
			apiCallBegan({
				method: 'get',
				url: 'users/getinfo',
				onSuccess: getUserInfoSuccess.type,
			})
		);
};

export const updateAddress = ({
	houseNumber,
	postalCode,
	...rest
}: UserAddress) => async (dispatch: Dispatch, getState: () => RootState) => {
	await dispatch(
		apiCallBegan({
			method: getState().auth.userDetails.user.address ? 'put' : 'post',
			url: 'users/address',
			data: {
				housenumber: houseNumber,
				postalcode: postalCode,
				...rest,
			},
			onStart: updateAddressInitiated.type,
			onSuccess: updateAddressSuccess.type,
			onError: updateAddressFailed.type,
		})
	);
};

export const changeUserPassword = (data: {
	oldPassword: string;
	newPassword: string;
}) =>
	apiCallBegan({
		method: 'post',
		url: 'users/changepassword',
		data: { oldpassword: data.oldPassword, newpassword: data.newPassword },
		onStart: changePasswordInitiated.type,
		onError: changePasswordFailed.type,
		onSuccess: changePasswordSuccess.type,
	});

export const getAddressInString = (user: UserDetails) => {
	if (user.address) {
		const {
			houseNumber,
			area,
			state,
			city,
			postalCode,
			landmark,
			country,
		} = user.address;
		if (landmark)
			return `${houseNumber}, ${area}, ${state}, ${city}, ${postalCode}, ${landmark}, ${country}`;
		return `${houseNumber}, ${area}, ${state}, ${city}, ${postalCode}, ${country}`;
	}
	return ``;
};
