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
	name: 'login',
	initialState,

	reducers: {
		errorUpdated: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		loginInitiated: (state, action) => {
			state.loading = true;
		},
		loginFulfilled: (state, action) => {},
		loginFailed: (state, action) => {
			if (action.payload === 403) state.error = 'Invalid email or password';
			else state.error = action.payload;
			state.loading = false;
		},
		passTypeUpdated: (state, action) => {
			state.passType = action.payload;
		},
		userLoggedOut: (state, action) => {},
	},
});

export default slice.reducer;

const {
	errorUpdated,
	loginInitiated,
	loginFailed,
	passTypeUpdated,
} = slice.actions;

export const {
	loginFulfilled,
	userLoggedOut, //TODO remove export
} = slice.actions;

export const logInUser = (
	{ email, password }: { email: string; password: string },
	location: string
) =>
	apiCallBegan({
		method: 'post',
		url: `users/login`,
		data: { email, password },
		onStart: loginInitiated.type,
		onSuccess: loginFulfilled.type,
		onError: loginFailed.type,
		location,
	});

export const updateError = (error: string) => errorUpdated(error);
export const updatePassType = (type: string) => passTypeUpdated(type);
export const logOutUser = () => userLoggedOut('');
