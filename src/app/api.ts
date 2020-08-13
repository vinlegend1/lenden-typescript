import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan: (reqObject: object) => void = createAction(
	'api/callBegan'
);
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');
