import { createSlice } from '@reduxjs/toolkit';
import { UserSlice } from '../models/auth';
import { apiCallBegan } from '../api';
import { getCurrentUser, getToken } from '../../services/authService';
import { RootState, ActionWithPayload } from './../models/index';
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
	mobilenumber: number;
}

const mapToViewModel = (data: FetchedAddress) => ({
	city: data.city,
	country: data.country,
	houseNumber: data.housenumber,
	streetName: data.streetname,
	state: data.state,
	landmark: data.landmark,
	postalCode: data.postalcode,
	mobileNumber: data.mobilenumber,
});

const initialState: UserSlice = {
	userId: '',
	name: '',
	token: '',
	email: '',
};

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userReceivedFromToken: (
			user: UserSlice,
			action: ActionWithPayload<{
				userId: string;
				name: string;
				token: string;
				email: string;
			}>
		) => {
			const { userId, name, token, email } = action.payload;
			user.userId = userId;
			user.email = email;
			user.name = name;
			user.token = token;
		},
		addressReceived: (
			user,
			action: ActionWithPayload<{ data: FetchedAddress }>
		) => {
			const address = action.payload.data;
			address.postalcode = address.postalcode.toString();
			user.address = mapToViewModel(address);
		},
	},
});

export default slice.reducer;

const { userReceivedFromToken, addressReceived } = slice.actions;

export const getUser = () => (dispatch: Dispatch) => {
	const token = getToken();
	if (token) {
		const user = getCurrentUser();
		if (user) {
			dispatch(
				userReceivedFromToken({
					userId: user.userId,
					name: user.name,
					email: user.sub,
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
	const userId = getState().auth.user.userId;
	if (userId)
		dispatch(
			apiCallBegan({
				method: 'get',
				url: `users/address/${userId}`,
				onSuccess: addressReceived.type,
			})
		);
};
