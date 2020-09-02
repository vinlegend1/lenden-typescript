import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { SignSlice } from '../models/auth';
import { ActionWithPayload } from './../models';
import { ErrorResponsePayload } from '../models/api';

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
		signupFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			if (typeof action.payload === 'string') state.error = action.payload;
			else {
				if (action.payload.status === 400)
					state.error = 'User already registered!';
				else state.error = action.payload.data.message.trim();
			}

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
			state.success =
				'Your account has been successfully verified. You can now login using the button below';
		},

		verifyFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			if (typeof action.payload === 'string') state.error = action.payload;
			else {
				if (action.payload.status === 401)
					state.error =
						'Sorry, the link you have requested has expired. Please go to login in order to generate a new link.';
				else if (action.payload.status === 400)
					state.error =
						'Sorry, the link you have requested is invalid. Please go to login in order to generate a new link.';
				else if (action.payload.status === 404)
					state.error =
						'Sorry, Your account has been already verified. You can simply login using the button  below';
				else state.error = action.payload.data.message.trim();
			}

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
