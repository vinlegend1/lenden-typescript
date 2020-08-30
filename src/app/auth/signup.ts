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
		// passTypeUpdated: (state, action: ActionWithPayload<PassType>) => {
		// 	state.passType = action.payload;
		// },

		signupInitiated: state => {
			state.error = '';
			state.success = '';
			state.loading = true;
		},
		signupFailed: (state, action: ActionWithPayload<number>) => {
			if (action.payload === 400) state.error = 'User already registered!';
			state.loading = false;
		},
		signupFulfilled: state => {
			state.loading = false;
			state.error = '';
			state.success = 'Successfully registered!';
		},
	},
});

export default slice.reducer;

export const {
	errorUpdated,
	successUpdated,
	// passTypeUpdated,
	signupInitiated,
	signupFailed,
	signupFulfilled,
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
// export const updatePassType = (type: PassType) => passTypeUpdated(type);
