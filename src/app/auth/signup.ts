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
	name: 'signup',
	initialState,
	reducers: {
		errorUpdated: (state, action: ActionWithPayload<string>) => {
			state.error = action.payload;
		},
		successUpdated: (state, action: ActionWithPayload<string>) => {
			state.success = action.payload;
		},

		signupInitiated: state => {
			state.error = '';
			state.success = '';
			state.loading = true;
		},
		signupFailed: (state, action: ActionWithPayload<number>) => {
			if (action.payload === 400) state.error = 'User already registered!';
			else if (typeof action.payload === 'string') state.error = action.payload;
			state.loading = false;
		},
		signupFulfilled: state => {
			state.loading = false;
			state.error = '';
			state.success = 'Successfully registered!';
		},

		verifyFulfilled: state => {
			state.loading = false;
			state.error = '';
			state.success = 'Your Email has been successfully verified!';
		},

		verifyFailed: (state, action: ActionWithPayload<number | string>) => {
			if (typeof action.payload === 'number') {
				if (action.payload === 403)
					state.error = 'Invalid link or link expired';
				else if (action.payload === 400)
					state.error = 'Your Email has already been verified';
			} else if (typeof action.payload === 'string')
				state.error = action.payload;
			state.loading = false;
		},
	},
});

export default slice.reducer;

export const {
	errorUpdated,
	successUpdated,
	signupInitiated,
	signupFailed,
	signupFulfilled,
	verifyFailed,
	verifyFulfilled,
} = slice.actions;

export interface SignUpUserModel {
	name: string;
	email: string;
	password: string;
	mobileNumber: string;
}

export const signUpUser = (user: SignUpUserModel) => {
	const { name, email, password, mobileNumber } = user;
	return apiCallBegan({
		method: 'post',
		url: 'users',
		onStart: signupInitiated.type,
		onSuccess: signupFulfilled.type,
		onError: signupFailed.type,
		data: { name, email, password, mobilenumber: mobileNumber },
	});
};

export const updateError = (error: string) => errorUpdated(error);
export const updateSuccess = (error: string) => successUpdated(error);

export const verifyEmailAddress = (token: string) =>
	apiCallBegan({
		method: 'post',
		url: 'users/emailverification',
		data: { token },
		onStart: signupInitiated.type,
		onSuccess: verifyFulfilled.type,
		onError: verifyFailed.type,
	});
