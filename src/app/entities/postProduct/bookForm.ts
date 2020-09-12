import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ActionWithPayload, RootState } from './../../models/index';
import { apiCallBegan } from './../../api';
import { ErrorResponsePayload } from '../../models/api';

export interface BookFormSlicePage1 {
	title: string;
	description: string;
	mrp: number;
	bindingType: string;
	inkStains: string;
}

export interface BookFormSlicePage2 {
	bookFoxed: string;
	bindingCondition: string;
	coverCondition: string;
	bookRepaired: number;
}

interface InitialState {
	loading: boolean;
	error: string;
	success: string;
	data: BookFormSlicePage1 & BookFormSlicePage2;
}

const initialState: InitialState = {
	loading: false,
	error: '',
	success: '',
	data: {
		title: '',
		description: '',
		mrp: -1,
		bindingType: '',
		inkStains: '',
		bookFoxed: '',
		bindingCondition: '',
		coverCondition: '',
		bookRepaired: -1,
	},
};

const mapToViewModal = (data: BookFormSlicePage1 & BookFormSlicePage2) => ({
	title: data.title,
	mrp: data.mrp,
	description: data.description,
	binding_type: data.bindingType,
	ink_stains: data.inkStains,
	book_foxed: data.bookFoxed,
	binding_condition: data.bindingCondition,
	front_back_condition: data.coverCondition,
	number_of_time_book_repaired: data.bookRepaired,
});

const slice = createSlice({
	name: 'bookForm',
	initialState,
	reducers: {
		page1DetailsUpdated: (
			state,
			action: ActionWithPayload<BookFormSlicePage1>
		) => {
			const {
				title,
				description,
				mrp,
				bindingType,
				inkStains,
			} = action.payload;

			state.data.title = title;
			state.data.description = description;
			state.data.mrp = mrp;
			state.data.bindingType = bindingType;
			state.data.inkStains = inkStains;
		},
		page2DetailsUpdated: (
			state,
			action: ActionWithPayload<BookFormSlicePage2>
		) => {
			const {
				bookFoxed,
				bindingCondition,
				coverCondition,
				bookRepaired,
			} = action.payload;

			state.data.bookFoxed = bookFoxed;
			state.data.bindingCondition = bindingCondition;
			state.data.coverCondition = coverCondition;
			state.data.bookRepaired = bookRepaired;
		},

		formCleared: state => Object.keys(state).forEach(key => (state[key] = '')),

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
	page1DetailsUpdated,
	page2DetailsUpdated,
	formCleared,
	formSubmitInitiated,
	formSubmitFailed,
	formSubmitSuccess,
} = slice.actions;

export const updateBookFormPage1Details = (data: BookFormSlicePage1) =>
	page1DetailsUpdated(data);
export const updateBookFormPage2Details = (data: BookFormSlicePage2) =>
	page2DetailsUpdated(data);

export const postBookForm = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const formState = getState().entities.postProduct.bookForm.data;
	const data = mapToViewModal(formState);

	dispatch(
		apiCallBegan({
			method: 'post',
			url: 'products/book',
			data,
			onStart: formSubmitInitiated.type,
			onError: formSubmitFailed.type,
			onSuccess: formSubmitSuccess.type,
		})
	);
};

export const clearBookForm = () => formCleared();
