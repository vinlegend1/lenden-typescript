import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { RootState, ActionWithPayload } from '../models';

const slice = createSlice({
	name: 'common',
	initialState: { isMobile: false, loadingPage: false },
	reducers: {
		deviceTypeChanged: (state, action: ActionWithPayload<boolean>) => {
			state.isMobile = action.payload;
		},
	},
});

export default slice.reducer;

const { deviceTypeChanged } = slice.actions;

export const updateDeviceType = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const { isMobile } = getState().entities.common;
	const currState = window.innerWidth < 700;

	if (currState !== isMobile) {
		if (currState) dispatch(deviceTypeChanged(true));
		else dispatch(deviceTypeChanged(false));
	}
};
