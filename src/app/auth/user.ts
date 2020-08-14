import { createSlice } from '@reduxjs/toolkit';
import { UserSlice } from '../models/auth';
import { apiCallBegan } from '../api';
import { getCurrentUser, getToken } from '../../services/authService';
import { RootState } from './../models/index';
import { Dispatch } from 'redux';

interface FetchedAddress {
	city: string;
	country: string;
	housenumber: string;
	streetname: string;
	state: string;
	landmark: string;
	postalcode: number;
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
			action: {
				type: string;
				payload: {
					userId: string;
					name: string;
					token: string;
					email: string;
				};
			}
		) => {
			const { userId, name, token, email } = action.payload;
			user.userId = userId;
			user.email = email;
			user.name = name;
			user.token = token;
		},
		addressReceived: (
			user,
			action: { type: string; payload: { data: FetchedAddress } }
		) => {
			const address = action.payload.data;
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
