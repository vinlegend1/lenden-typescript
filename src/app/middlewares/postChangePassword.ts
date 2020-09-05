import { deleteToken } from '../../services/authService';
import { MiddlewareStore } from '../models';
import { Dispatch, Action } from 'redux';
import { changePasswordSuccess } from '../auth/userDetails';

const postChangePassword = (_store: MiddlewareStore) => (next: Dispatch) => (
	action: Action
) => {
	if (action.type !== changePasswordSuccess.type) return next(action);

	deleteToken();
};

export default postChangePassword;
