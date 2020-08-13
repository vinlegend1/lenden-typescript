import { createAction, Action } from '@reduxjs/toolkit';

interface RequestObject {
	method: 'get' | 'post' | 'put' | 'delete';
	url: string;
	data: object;
	onSuccess?: string;
	onError?: string;
	onStart?: string;
	location?: { state: object };
}

export const apiCallBegan: (reqData: RequestObject) => Action = createAction(
	'api/callBegan'
);
export const apiCallSuccess: () => Action = createAction('api/callSuccess');
export const apiCallFailed: () => Action = createAction('api/callFailed');
