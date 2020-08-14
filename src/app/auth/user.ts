import { createSlice, Action } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import RootState from './../models/index';
import { UserSlice } from '../models/auth';
import { getCurrentUser, getToken } from '../../services/authService';

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
		userReceivedFromToken: (user: UserSlice, action) => {
			const { userId, name, token, email } = action.payload;
			user.userId = userId;
			user.email = email;
			user.name = name;
			user.token = token;
		},
		addressReceived: (user, action) => {
			const address: FetchedAddress = action.payload.data;
			user.address = mapToViewModel(address);
		},
	},
});

export default slice.reducer;

const { userReceivedFromToken, addressReceived } = slice.actions;

export const getUser = () => (dispatch: (action: Action) => void) => {
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
	dispatch: (action: Action) => void,
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
