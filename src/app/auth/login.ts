import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { SignSlice } from '../models/auth';
import { ActionWithPayload } from './../models';
import { ErrorResponsePayload } from '../models/api';

export const verifyTokenErrors = {
	invalidEmail: 'Sorry, the link you have requested is invalid',
	expiredEmail:
		'Sorry, the link you have requested has expired. Please generate a new link!',
};

const initialState: SignSlice = {
	error: '',
	success: '',
	loading: false,
	loadingPage: true,
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
			state.error = '';
			state.success = '';
			state.loading = true;
		},
		loginFulfilled: () => {},
		loginFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			if (typeof action.payload === 'string') {
				state.error = action.payload;
			} else {
				if (action.payload.status === 403)
					state.error = 'Invalid email or password';
				else state.error = action.payload.data.message.trim();
			}

			state.loading = false;
		},
		userLoggedOut: () => {},
		forgotPasswordSuccess: state => {
			state.loading = false;
			state.error = '';
			state.success =
				"We've sent a password reset link to your email. Click on the link and reset your password!";
		},
		forgotPasswordFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			state.loading = false;
			state.success = '';

			if (typeof action.payload === 'string') state.error = action.payload;
			else {
				// if (action.payload.status === 404)
				// 	state.error = "User hasn't signed up yet!";
				// else
				state.error = action.payload.data.message.trim();
			}
		},

		verifyPasswordTokenInitiated: state => {
			state.loadingPage = true;
		},

		verifyPasswordTokenSuccess: state => {
			state.success = 'Token Verified!';
			state.loadingPage = false;
			state.error = '';
		},

		verifyPasswordTokenFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			state.success = '';

			if (typeof action.payload === 'string') state.error = action.payload;
			else {
				if (action.payload.status === 401)
					state.error = verifyTokenErrors.expiredEmail;
				else if (action.payload.status === 404)
					state.error = verifyTokenErrors.invalidEmail;
				else state.error = action.payload.data.message.trim();
			}

			state.loadingPage = false;
		},

		verifyUserInitiated: state => {
			state.error = '';
			state.success = '';
			state.loading = true;
		},

		verifyUserSuccess: state => {
			state.error = '';
			state.success = 'Verified!';
		},

		verifyUserFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			state.success = '';

			if (typeof action.payload === 'string') {
				state.error = action.payload;
				state.loading = false;
			} else {
				if (action.payload.status === 404) state.error = '';
				else if (action.payload.status === 400) {
					state.error = "Email hasn't been verified yet";
					state.loading = false;
				} else state.error = action.payload.data.message.trim();
			}
		},

		resetPasswordFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			if (typeof action.payload === 'string') {
				state.error = action.payload;
				state.loading = false;
			} else {
				state.error = action.payload.data.message;
			}
			state.success = '';
			state.loading = false;
		},

		resetPasswordSuccess: state => {
			state.error = '';
			state.loading = false;
			state.success = 'Successfully Changed!';
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
	verifyPasswordTokenFailed,
	verifyPasswordTokenInitiated,
	verifyPasswordTokenSuccess,
	verifyUserFailed,
	verifyUserInitiated,
	verifyUserSuccess,
	resetPasswordFailed,
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

export const verifyUser = (email: string) =>
	apiCallBegan({
		method: 'post',
		data: { email },
		url: 'users/isuserverified',
		onStart: verifyUserInitiated.type,
		onSuccess: verifyUserSuccess.type,
		onError: verifyUserFailed.type,
	});

export const forgotPassword = (email: string) =>
	apiCallBegan({
		method: 'post',
		data: { email },
		url: 'users/passwordresetrequest',
		onStart: loginInitiated.type,
		onSuccess: forgotPasswordSuccess.type,
		onError: forgotPasswordFailed.type,
	});

export const verifyPasswordToken = (token: string) =>
	apiCallBegan({
		method: 'post',
		data: { token },
		url: 'users/istokenvalid',
		onStart: verifyPasswordTokenInitiated.type,
		onSuccess: verifyPasswordTokenSuccess.type,
		onError: verifyPasswordTokenFailed.type,
	});

export const resetPassword = (data: { password: string; token: string }) =>
	apiCallBegan({
		method: 'post',
		data,
		url: 'users/passwordreset',
		onStart: loginInitiated.type,
		onError: resetPasswordFailed.type,
	});
