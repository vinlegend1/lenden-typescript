import { Dispatch, Action } from 'redux';
import { editProfileSuccess } from '../auth/userDetails';
import { ActionWithPayload } from './../models/index';
import { setToken } from './../../services/authService';

const postEditProfileSuccess = () => (next: Dispatch) => (
	action: ActionWithPayload<{ data: { token: string } }>
) => {
	if (action.type !== editProfileSuccess.type) return next(action);

	const { data } = action.payload;

	next(action);
	setToken(`Bearer ${data.token}`);
};

export default postEditProfileSuccess;
