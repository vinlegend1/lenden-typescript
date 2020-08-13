import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';
import { SignSlice } from '../models/auth';

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
		errorUpdated: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		loginInitiated: state => {
			state.loading = true;
		},
		loginFulfilled: () => {},
		loginFailed: (state, action) => {
			if (action.payload === 403) state.error = 'Invalid email or password';
			else state.error = action.payload;
			state.loading = false;
		},
		passTypeUpdated: (state, action) => {
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
	userLoggedOut,
} = slice.actions;

export const { loginFulfilled } = slice.actions;

interface SignInUser {
	email: string;
	password: string;
}

export const logInUser = (user: SignInUser, location: string) => {
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
export const updatePassType = (type: string) => passTypeUpdated(type);
export const logOutUser = () => userLoggedOut();
