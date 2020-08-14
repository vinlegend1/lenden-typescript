import { createAction, Action } from '@reduxjs/toolkit';
import { RequestObject, ResponseObject } from './models/api';

export const apiCallBegan: (reqData: RequestObject) => Action = createAction(
	'api/callBegan'
);
export const apiCallSuccess: (resData: ResponseObject) => Action = createAction(
	'api/callSuccess'
);
export const apiCallFailed: (err: Error) => Action = createAction(
	'api/callFailed'
);
