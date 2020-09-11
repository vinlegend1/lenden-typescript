import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ActionWithPayload, RootState } from './../../models/index';
import { apiCallBegan } from './../../api';

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

const initialState: BookFormSlicePage1 & BookFormSlicePage2 = {
	title: '',
	description: '',
	mrp: -1,
	bindingType: '',
	inkStains: '',
	bookFoxed: '',
	bindingCondition: '',
	coverCondition: '',
	bookRepaired: -1,
};

const mapToViewModal = (data: BookFormSlicePage1 & BookFormSlicePage2) => ({
	title: data.title,
	description: data.description,
	binding_type: data.bindingType,
	ink_stains: data.inkStains,
	book_foxed: data.bookFoxed,
	binding_condition: data.bindingCondition,
	front_back_condition: data.coverCondition,
	book_repaired_earlier: data.bookRepaired,
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

			state.title = title;
			state.description = description;
			state.mrp = mrp;
			state.bindingType = bindingType;
			state.inkStains = inkStains;
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

			state.bookFoxed = bookFoxed;
			state.bindingCondition = bindingCondition;
			state.coverCondition = coverCondition;
			state.bookRepaired = bookRepaired;
		},

		formCleared: state => Object.keys(state).forEach(key => (state[key] = '')),
	},
});

export default slice.reducer;

const { page1DetailsUpdated, page2DetailsUpdated, formCleared } = slice.actions;

export const updateBookFormPage1Details = (data: BookFormSlicePage1) =>
	page1DetailsUpdated(data);
export const updateBookFormPage2Details = (data: BookFormSlicePage2) =>
	page2DetailsUpdated(data);

export const postBookForm = () => (
	dispatch: Dispatch,
	getState: () => RootState
) => {
	const formState = getState().entities.postProduct.bookForm;
	const data = mapToViewModal(formState);

	dispatch(
		apiCallBegan({
			method: 'post',
			url: 'products/book',
			data,
		})
	);
};

export const clearBookForm = () => formCleared();
