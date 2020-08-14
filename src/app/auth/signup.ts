import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { SignSlice, PassType } from '../models/auth';

const initialState: SignSlice = {
	error: '',
	success: '',
	loading: false,
	passType: 'password',
};

const slice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		errorUpdated: (state, action: { type: string; payload: string }) => {
			state.error = action.payload;
		},
		successUpdated: (state, action: { type: string; payload: string }) => {
			state.success = action.payload;
		},
		passTypeUpdated: (state, action: { type: string; payload: PassType }) => {
			state.passType = action.payload;
		},

		signupInitiated: state => {
			state.loading = true;
		},
		signupFailed: (state, action: { type: string; payload: number }) => {
			if (action.payload === 400) state.error = 'User already registered!';
			state.loading = false;
		},
		signupFulfilled: state => {
			state.loading = false;
			state.success = 'Successfully registered!';
		},
	},
});

export default slice.reducer;

export const {
	errorUpdated,
	successUpdated,
	passTypeUpdated,
	signupInitiated,
	signupFailed,
	signupFulfilled,
} = slice.actions;

interface SignUpUser {
	name: string;
	email: string;
	password: string;
}

export const signUpUser = (user: SignUpUser) => {
	const { name, email, password } = user;
	return apiCallBegan({
		method: 'post',
		url: 'users',
		onStart: signupInitiated.type,
		onSuccess: signupFulfilled.type,
		onError: signupFailed.type,
		data: { name, email, password },
	});
};

export const updateError = (error: string) => errorUpdated(error);
export const updateSuccess = (error: string) => successUpdated(error);
export const updatePassType = (type: PassType) => passTypeUpdated(type);
