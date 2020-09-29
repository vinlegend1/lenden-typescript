import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ErrorResponsePayload } from '../../models/api';
import { ActionWithPayload, RootState } from './../../models/index';
import { apiCallBegan } from './../../api';

export interface DonateBookSlice {
	title: string;
	confirmation: string;
	mobileNumber: string;
}

interface InitialState {
	loading: boolean;
	error: string;
	success: string;
	data: DonateBookSlice;
}

const initialState: InitialState = {
	loading: false,
	error: '',
	success: '',
	data: {
		title: '',
		confirmation: '',
		mobileNumber: '',
	},
};

const mapToViewModal = (data: DonateBookSlice) => ({
	titles: data.title,
	reusablecondition: data.confirmation,
	contactnumber: data.mobileNumber,
});
const slice = createSlice({
	name: 'donateBook',
	initialState,
	reducers: {
		detailsUpdated: (state, action: ActionWithPayload<DonateBookSlice>) => {
			const { title, confirmation, mobileNumber } = action.payload;

			state.data.title = title;
			state.data.confirmation = confirmation;
			state.data.mobileNumber = mobileNumber;
		},

		formCleared: state => {
			const { data } = state;
			data.confirmation = '';
			data.mobileNumber = '';
			data.title = '';
		},

		formSubmitInitiated: state => {
			state.loading = true;
			state.error = '';
			state.success = '';
		},
		formSubmitFailed: (
			state,
			action: ActionWithPayload<ErrorResponsePayload | string>
		) => {
			state.loading = false;
			if (typeof action.payload === 'string') state.error = action.payload;
			else state.error = action.payload.data.message;
			state.success = '';
		},

		formSubmitSuccess: state => {
			state.loading = false;
			state.error = '';
			state.success = 'Successfully Submitted!';
		},
	},
});

export default slice.reducer;

const {
	detailsUpdated,
	formCleared,
	formSubmitInitiated,
	formSubmitFailed,
	formSubmitSuccess,
} = slice.actions;

export const updateDonateBookDetails = (data: DonateBookSlice) =>
	detailsUpdated(data);
export const clearDonateBookForm = () => formCleared();

export const postDonateBookForm = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const formState = getState().entities.postProduct.donateBook.data;
	const data = mapToViewModal(formState);

	dispatch(
		apiCallBegan({
			method: 'post',
			url: 'socialresponsibility/donatebook', // wao endpoint
			data,
			onStart: formSubmitInitiated.type,
			onError: formSubmitFailed.type,
			onSuccess: formSubmitSuccess.type,
		})
	);
};
