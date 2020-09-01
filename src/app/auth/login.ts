import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { SignSlice } from '../models/auth';
import { ActionWithPayload } from './../models';

const initialState: SignSlice = {
	error: '',
	success: '',
	loading: false,
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
		userLoggedOut: () => {},
		forgotPasswordSuccess: (state, action) => {
			state.loading = false;
			state.error = '';
			state.success =
				"We've sent a password reset link to your email. Click on the link and reset your password!";
		},
		forgotPasswordFailed: (state, action) => {
			state.loading = false;
			state.error = 'Something went wrong!';
			state.success = '';
		},
	},
});

export default slice.reducer;

const {
	errorUpdated,
	loginInitiated,
	loginFailed,
	forgotPasswordSuccess,
	forgotPasswordFailed,
} = slice.actions;

export const { loginFulfilled, userLoggedOut } = slice.actions;

export interface SignInUser {
	email: string;
	password: string;
}

export interface Location {
	state?: object;
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
export const logOutUser = () => userLoggedOut();

export const forgotPassword = (email: string) =>
	apiCallBegan({
		method: 'post',
		data: { email },
		url: 'users/passwordresetrequest',
		onStart: loginInitiated.type,
		onSuccess: forgotPasswordSuccess.type,
		onError: forgotPasswordFailed.type,
	});
