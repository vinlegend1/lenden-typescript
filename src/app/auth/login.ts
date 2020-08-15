import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { SignSlice, PassType } from '../models/auth';
import { ActionWithPayload } from './../models';

const initialState: SignSlice = {
	error: '',
	success: '',
	loading: false,
	passType: 'password',
};

const slice = createSlice({
	name: 'login',
	initialState,

	reducers: {
		errorUpdated: (state, action: ActionWithPayload<string>) => {
			state.error = action.payload;
			state.loading = false;
		},
		loginInitiated: state => {
			state.loading = true;
		},
		loginFulfilled: () => {},
		loginFailed: (state, action: ActionWithPayload<number | string>) => {
			if (typeof action.payload === 'number' && action.payload === 403) {
				state.error = 'Invalid email or password';
			} else if (typeof action.payload === 'string')
				state.error = action.payload;
			state.loading = false;
		},
		passTypeUpdated: (state, action: ActionWithPayload<PassType>) => {
			state.passType = action.payload;
		},
		userLoggedOut: () => {},
	},
});

export default slice.reducer;

const {
	errorUpdated,
	loginInitiated,
	loginFailed,
	passTypeUpdated,
} = slice.actions;

export const { loginFulfilled, userLoggedOut } = slice.actions;

interface SignInUser {
	email: string;
	password: string;
}

interface Location {
	state: object;
}

export const logInUser = (user: SignInUser, location: Location) => {
	const { email, password } = user;
	return apiCallBegan({
		method: 'post',
		url: `users/login`,
		data: { email, password },
		onStart: loginInitiated.type,
		onSuccess: loginFulfilled.type,
		onError: loginFailed.type,
		location,
	});
};

export const updateError = (error: string) => errorUpdated(error);
export const updatePassType = (type: PassType) => passTypeUpdated(type);
// export const logOutUser = () => userLoggedOut();
