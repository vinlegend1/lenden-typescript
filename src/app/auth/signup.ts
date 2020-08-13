import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

interface LoginSlice {
	error: string;
	success: string;
	loading: boolean;
	passType: 'password' | 'text';
}

const initialState: LoginSlice = {
	error: '',
	success: '',
	loading: false,
	passType: 'password',
};

const slice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		errorUpdated: (state, action) => {
			state.error = action.payload;
		},
		successUpdated: (state, action) => {
			state.success = action.payload;
		},
		passTypeUpdated: (state, action) => {
			state.passType = action.payload;
		},

		signupInitiated: (state, action) => {
			state.loading = true;
		},
		signupFailed: (state, action) => {
			if (action.payload === 400) state.error = 'User already registered!';
			state.loading = false;
		},
		signupFulfilled: (state, action) => {
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

export const signUpUser = ({
	name,
	email,
	password,
}: {
	name: string;
	email: string;
	password: string;
}) =>
	apiCallBegan({
		method: 'post',
		url: 'users',
		onStart: signupInitiated.type,
		onSuccess: signupFulfilled.type,
		onError: signupFailed.type,
		data: { name, email, password },
	});

export const updateError = (error: string) => errorUpdated(error);
export const updateSuccess = (error: string) => successUpdated(error);
export const updatePassType = (type: string) => passTypeUpdated(type);
