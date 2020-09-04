import { createSlice } from '@reduxjs/toolkit';
import { UserSlice } from '../models/auth';
import { apiCallBegan } from '../api';
import { getCurrentUser, getToken } from '../../services/authService';
import { RootState, ActionWithPayload } from '../models/index';
import { Dispatch } from 'redux';
import { userLoggedOut } from './login';

interface FetchedAddress {
	city: string;
	country: string;
	housenumber: string;
	streetname: string;
	state: string;
	landmark: string;
	postalcode: string;
}

const mapToViewModel = (data: FetchedAddress) => ({
	city: data.city,
	country: data.country,
	houseNumber: data.housenumber,
	streetName: data.streetname,
	state: data.state,
	landmark: data.landmark,
	postalCode: data.postalcode,
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
				name: string;
				token: string;
				email: string;
				mobileNumber: string;
				gravatarId: string;
			}>
		) => {
			const {
				userId,
				name,
				token,
				email,
				mobileNumber,
				gravatarId,
			} = action.payload;

			user.userId = userId;
			user.email = email;
			user.name = name;
			user.token = token;
			user.mobileNumber = mobileNumber;
			user.gravatarId = `type${gravatarId}`;
		},
		addressReceived: (
			{ user },
			action: ActionWithPayload<{ data: FetchedAddress }>
		) => {
			const address = action.payload.data;
			address.postalcode = address.postalcode.toString();
			user.address = mapToViewModel(address);
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
					token: string;
					name: string;
					mobilenumber: string;
					gravatarid: string;
				};
			}>
		) => {
			const { name, token, mobilenumber, gravatarid } = action.payload.data;
			state.success = 'successfully verified';
			state.error = '';
			state.loading = false;
			state.user.name = name;
			state.user.token = token;
			state.user.mobileNumber = mobilenumber;
			state.user.gravatarId = `type${gravatarid}`;
		},
	},
});

export default slice.reducer;

const {
	userReceivedFromToken,
	addressReceived,
	editProfileInitiated,
} = slice.actions;

export const { editProfileSuccess } = slice.actions;

export const getUser = () => (dispatch: Dispatch) => {
	const token = getToken();
	if (token) {
		const user = getCurrentUser();
		if (user) {
			dispatch(
				userReceivedFromToken({
					userId: user.userid,
					name: user.name,
					email: user.sub,
					mobileNumber: user.mobilenumber,
					gravatarId: user.gravatarid,
					token,
				})
			);
		}
	}
};

export const getAddress = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const { userId } = getState().auth.userDetails.user;
	if (userId)
		dispatch(
			apiCallBegan({
				method: 'get',
				url: `users/address/${userId}`,
				onSuccess: addressReceived.type,
			})
		);
};

export const editProfile = ({
	name,
	mobileNumber,
	gravatarId,
}: {
	name: string;
	mobileNumber: string;
	gravatarId: string;
}) => async (dispatch: Dispatch, getState: () => RootState) => {
	const { email } = getState().auth.userDetails.user;

	await dispatch(
		apiCallBegan({
			method: 'put',
			url: 'users/editprofile',
			data: { name, email, mobilenumber: mobileNumber, gravatarid: gravatarId },
			onStart: editProfileInitiated.type,
			onSuccess: editProfileSuccess.type,
		})
	);
};
