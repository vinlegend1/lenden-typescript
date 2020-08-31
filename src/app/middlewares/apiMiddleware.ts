import http from '../../services/httpService';
import { api } from '../../config.json';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../api';
import { Dispatch } from 'redux';
import { RequestObject } from './../models/api';
import { MiddlewareStore } from './../models/index';

const apiMiddleware = (store: MiddlewareStore) => (
	next: Dispatch
) => async (action: { type: string; payload: RequestObject }) => {
	if (action.type !== apiCallBegan.type) return next(action);

	const userId = store.getState().auth.user.userId;
	const {
		method = 'get',
		url,
		data,
		onError,
		onStart,
		onSuccess,
		location,
	} = action.payload;

	if (onStart) store.dispatch({ type: onStart });
	next(action);

	try {
		const res = await http({
			method,
			data,
			url: `${api}/${url}`,
		});
		store.dispatch(
			apiCallSuccess({ data: res.data, headers: res.headers, location, userId })
		);
		if (onSuccess)
			store.dispatch({
				type: onSuccess,
				payload: { data: res.data, headers: res.headers, location, userId },
			});
	} catch (ex) {
		if (ex.response) {
			console.log(ex.response);
			store.dispatch(apiCallFailed(ex.response.status));
			if (onError)
				store.dispatch({ type: onError, payload: ex.response.status });
		} else {
			store.dispatch(apiCallFailed(ex.message));
			if (onError) store.dispatch({ type: onError, payload: ex.message });
		}
	}
};

export default apiMiddleware;
